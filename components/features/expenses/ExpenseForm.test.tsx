import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExpenseForm } from "./ExpenseForm";
import * as FinanceContext from "@/context/FinanceContext";

vi.mock("@/context/FinanceContext", () => ({
	useFinanceContext: vi.fn(),
}));

describe("ExpenseForm", () => {
	const mockOnSubmit = vi.fn();
	const mockOnCancel = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		vi.spyOn(FinanceContext, "useFinanceContext").mockReturnValue({
			financialData: { budgets: [{ category: "Food", budget: 500, spent: 0 }] },
		} as unknown as ReturnType<typeof FinanceContext.useFinanceContext>);
	});

	it("shows validation errors for empty name and non-positive amount", () => {
		render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

		fireEvent.click(screen.getByText("Save Expense"));

		expect(screen.getByText("Expense name is required")).toBeDefined();
		expect(screen.getByText("Amount must be greater than 0")).toBeDefined();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("calls onSubmit with correct payload when valid data is entered", () => {
		render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

		fireEvent.change(screen.getByPlaceholderText("e.g. Groceries"), {
			target: { value: "Lunch" },
		});
		fireEvent.change(screen.getByPlaceholderText("0.00"), {
			target: { value: "15.50" },
		});
		fireEvent.click(screen.getByText("Save Expense"));

		expect(mockOnSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				name: "Lunch",
				amount: 15.5,
				category: "Food",
			}),
		);
	});
});
