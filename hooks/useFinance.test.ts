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
		// Simulate a logged-in user
		cb({ uid: "test-user-123" });
		return vi.fn(); // unsubscribe mock
	}),
}));

vi.mock("firebase/firestore", () => ({
	doc: vi.fn(),
	onSnapshot: vi.fn((docRef, cb) => {
		// Simulate an empty database returning nothing yet
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

		// Wait for the auth effect to resolve
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		// Attempt to add an invalid expense (negative amount violates the schema)
		await act(async () => {
			result.current.addExpense({
				name: "Bad Expense",
				amount: -500, // Invalid: amount must be positive
				category: "Food",
				date: "2023-10-10",
			});
		});

		// The schema should catch the negative amount, meaning setDoc is never called for this bad data.
		// Note: setDoc is called once initially by onSnapshot setting DEFAULT_DATA, so we check it wasn't called twice.
		expect(setDoc).toHaveBeenCalledTimes(1);
	});

	it("allows valid data to be written to Firestore", async () => {
		const { result } = renderHook(() => useFinance());

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		// Attempt to add a valid expense
		await act(async () => {
			result.current.addExpense({
				name: "Good Expense",
				amount: 50,
				category: "Food",
				date: "2023-10-10",
			});
		});

		// setDoc should be called once for DEFAULT_DATA, and once for the valid expense
		expect(setDoc).toHaveBeenCalledTimes(2);
	});

	it("throws an AppError with code VALIDATION_FAILED for invalid imports", async () => {
		const { result } = renderHook(() => useFinance());

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		// Attempt to import a negative expense
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
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		// Force setDoc to throw an error on the next call
		vi.mocked(setDoc).mockRejectedValueOnce(
			new Error("Simulated Firestore Timeout"),
		);

		// Trigger a write with valid data
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
