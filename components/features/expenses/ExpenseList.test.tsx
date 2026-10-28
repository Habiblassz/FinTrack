import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ExpenseList from "./ExpenseList";

describe("ExpenseList Component", () => {
	const mockOnDelete = vi.fn();
	const mockOnEdit = vi.fn();

	const expenses = [
		{
			id: "1",
			name: "Groceries",
			amount: 150.5,
			category: "Food",
			date: "2023-10-10",
		},
		{
			id: "2",
			name: "Internet",
			amount: 60,
			category: "Bills",
			date: "2023-10-11",
		},
	];

	it("renders the empty state when no expenses exist", () => {
		render(
			<ExpenseList expenses={[]} onDelete={mockOnDelete} onEdit={mockOnEdit} />,
		);
		expect(screen.getByText("No expenses yet")).toBeTruthy();
		expect(
			screen.getByText("Start tracking your spending to see analytics."),
		).toBeTruthy();
	});

	it("renders a list of expenses correctly", () => {
		render(
			<ExpenseList
				expenses={expenses}
				onDelete={mockOnDelete}
				onEdit={mockOnEdit}
			/>,
		);
		expect(screen.getByText("Groceries")).toBeTruthy();
		expect(screen.getByText("Internet")).toBeTruthy();
		expect(screen.getByText("$150.50")).toBeTruthy();
		expect(screen.getByText("$60.00")).toBeTruthy();
		expect(screen.getByText("2 items")).toBeTruthy();
	});

	it("calls onEdit when the edit button is clicked", () => {
		// Need a container to find the hidden/hoverable buttons easily without relying on test-ids
		const { container } = render(
			<ExpenseList
				expenses={expenses}
				onDelete={mockOnDelete}
				onEdit={mockOnEdit}
			/>,
		);

		// Find all buttons. First row has edit then delete.
		const buttons = container.querySelectorAll("button");
		const editButton = buttons[0]; // First button in the first expense row

		fireEvent.click(editButton);
		expect(mockOnEdit).toHaveBeenCalledWith(expenses[0]);
	});

	it("calls onDelete when the delete button is clicked", () => {
		const { container } = render(
			<ExpenseList
				expenses={expenses}
				onDelete={mockOnDelete}
				onEdit={mockOnEdit}
			/>,
		);

		const buttons = container.querySelectorAll("button");
		const deleteButton = buttons[1]; // Second button in the first expense row

		fireEvent.click(deleteButton);
		expect(mockOnDelete).toHaveBeenCalledWith("1");
	});
});
