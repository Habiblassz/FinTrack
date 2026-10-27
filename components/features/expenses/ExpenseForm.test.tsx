import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExpenseForm } from "./ExpenseForm";
import { useFinanceContext } from "@/context/FinanceContext";

// Mock the context hook
vi.mock("@/context/FinanceContext", () => ({
	useFinanceContext: vi.fn(),
}));

describe("ExpenseForm Validation", () => {
	const mockOnSubmit = vi.fn();
	const mockOnCancel = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useFinanceContext).mockReturnValue({
			financialData: {
				budgets: [{ category: "Food", budget: 500, spent: 0 }],
				expenses: [],
				monthlyIncome: 0,
				savingsGoal: 0,
				currentSavings: 0,
			},
		} as unknown as ReturnType<typeof useFinanceContext>);
	});

	it("displays Zod validation errors on empty submission", () => {
		render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

		// Form initializes with empty name and amount, date defaults to today
		fireEvent.click(screen.getByText("Save Expense"));

		expect(screen.getByText("Name is required")).toBeDefined();
		expect(screen.getByText("Amount must be positive")).toBeDefined();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("displays Zod validation error for negative amount", () => {
		render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

		fireEvent.change(screen.getByTestId("expense-name-input"), {
			target: { value: "Groceries" },
		});
		fireEvent.change(screen.getByTestId("expense-amount-input"), {
			target: { value: "-50" },
		});

		fireEvent.click(screen.getByText("Save Expense"));

		expect(screen.getByText("Amount must be positive")).toBeDefined();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("calls onSubmit when validation passes", () => {
		render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

		fireEvent.change(screen.getByTestId("expense-name-input"), {
			target: { value: "Groceries" },
		});
		fireEvent.change(screen.getByTestId("expense-amount-input"), {
			target: { value: "100.50" },
		});
		// Date is pre-filled, Category defaults to "Food" from mock

		fireEvent.click(screen.getByText("Save Expense"));

		expect(mockOnSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				name: "Groceries",
				amount: 100.5,
				category: "Food",
			}),
		);
	});
});
