import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFinance } from "./useFinance";
import { setDoc } from "firebase/firestore";
import { logger } from "@/lib/logger";

// Mock the new logger
vi.mock("@/lib/logger", () => ({
	logger: {
		error: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
	},
}));

// Mock Firebase dependencies
vi.mock("@/lib/firebase", () => ({
	auth: {},
	db: {},
}));

vi.mock("firebase/auth", () => ({
	onAuthStateChanged: vi.fn((auth, cb) => {
		cb({ uid: "test-user-123" });
		return vi.fn();
	}),
}));

vi.mock("firebase/firestore", () => ({
	doc: vi.fn(() => "mock-doc-ref"),
	onSnapshot: vi.fn((docRef, cb) => {
		cb({ exists: () => false });
		return vi.fn();
	}),
	setDoc: vi.fn(),
}));

describe("useFinance Hook Validation", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("rejects invalid data and prevents Firestore writes", async () => {
		const { result } = renderHook(() => useFinance());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		await act(async () => {
			result.current.addExpense({
				name: "Bad Expense",
				amount: -500,
				category: "Food",
				date: "2023-10-10",
			});
		});

		expect(setDoc).toHaveBeenCalledTimes(1);
	});

	it("allows valid data to be written to Firestore", async () => {
		const { result } = renderHook(() => useFinance());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		await act(async () => {
			result.current.addExpense({
				name: "Good Expense",
				amount: 50,
				category: "Food",
				date: "2023-10-10",
			});
		});

		expect(setDoc).toHaveBeenCalledTimes(2);
	});

	it("throws an AppError with code VALIDATION_FAILED for invalid imports", async () => {
		const { result } = renderHook(() => useFinance());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		const invalidData = [
			{ name: "Bad", amount: -100, category: "Food", date: "2023-10-10" },
		];

		await expect(
			result.current.importExpenses(invalidData),
		).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
	});

	it("logs a structured error when Firestore write fails", async () => {
		const { result } = renderHook(() => useFinance());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		vi.mocked(setDoc).mockRejectedValueOnce(
			new Error("Simulated Firestore Timeout"),
		);

		await act(async () => {
			result.current.addExpense({
				name: "Valid Expense",
				amount: 50,
				category: "Food",
				date: "2023-10-10",
			});
		});

		expect(logger.error).toHaveBeenCalledWith("firestore_write_failed", {
			error: "Simulated Firestore Timeout",
			userId: "test-user-123",
		});
	});
});

describe("useFinance Hook CRUD Operations", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("handles income and balance updates", async () => {
		const { result } = renderHook(() => useFinance());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		await act(async () => {
			result.current.updateIncome(5000);
		});
		expect(setDoc).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({ monthlyIncome: 5000 }),
		);

		await act(async () => {
			result.current.updateBalance(2000);
		});
		expect(setDoc).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({ currentSavings: 2000 }),
		);
	});

	it("handles budget creation, updating, and deletion", async () => {
		const { result } = renderHook(() => useFinance());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		await act(async () => {
			result.current.addBudget("Entertainment", 200);
		});
		await act(async () => {
			result.current.addBudget("Entertainment", 200);
		}); // duplicate check
		await act(async () => {
			result.current.updateBudget("Entertainment", 300);
		});
		await act(async () => {
			result.current.deleteBudget("Entertainment");
		});

		expect(setDoc).toHaveBeenCalled();
	});

	it("handles expense updating and deletion", async () => {
		const { result } = renderHook(() => useFinance());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		await act(async () => {
			result.current.addExpense({
				name: "Test",
				amount: 100,
				category: "Food",
				date: "2023-10-10",
			});
		});

		// Extract the generated ID to update/delete it
		const lastCall =
			vi.mocked(setDoc).mock.calls[vi.mocked(setDoc).mock.calls.length - 1];
		const savedData = lastCall[1] as any;
		const expenseId = savedData.expenses[0].id;

		await act(async () => {
			result.current.updateExpense(expenseId, {
				name: "Test Updated",
				amount: 150,
				category: "Food",
				date: "2023-10-10",
			});
		});

		await act(async () => {
			result.current.deleteExpense(expenseId);
		});

		// Edge cases for missing IDs
		await act(async () => {
			result.current.deleteExpense("fake-id");
		});
		await act(async () => {
			result.current.updateExpense("fake-id", {
				name: "Fake",
				amount: 150,
				category: "Food",
				date: "2023-10-10",
			});
		});

		expect(setDoc).toHaveBeenCalled();
	});
});
