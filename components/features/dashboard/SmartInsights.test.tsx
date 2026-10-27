import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SmartInsights from "./SmartInsights";

describe("SmartInsights Component", () => {
	const defaultProps = {
		expenses: [],
		budgets: [],
		savingsRate: 20,
		totalExpenses: 0,
		monthlyIncome: 5000,
	};

	it("renders default positive insight when no other conditions are met", () => {
		render(<SmartInsights {...defaultProps} />);
		expect(screen.getByText("Great Progress!")).toBeTruthy();
		expect(
			screen.getByText(
				"Your finances are looking healthy. Keep maintaining good habits!",
			),
		).toBeTruthy();
	});

	it("renders excellent savings insight when savingsRate > 30", () => {
		render(<SmartInsights {...defaultProps} savingsRate={35} />);
		expect(screen.getByText("Excellent Savings!")).toBeTruthy();
		expect(
			screen.getByText("You're saving 35.0% of your income. Keep it up!"),
		).toBeTruthy();
	});

	it("renders low savings insight when savingsRate < 10", () => {
		render(<SmartInsights {...defaultProps} savingsRate={5} />);
		expect(screen.getByText("Low Savings Rate")).toBeTruthy();
		expect(
			screen.getByText(
				"Your savings rate is 5.0%. Consider reducing expenses.",
			),
		).toBeTruthy();
	});

	it("renders over budget warning when spent > 100% of budget", () => {
		const budgets = [{ category: "Housing", budget: 1000, spent: 1200 }];
		render(<SmartInsights {...defaultProps} budgets={budgets} />);
		expect(screen.getByText("Over Budget!")).toBeTruthy();
		expect(
			screen.getByText("You've exceeded your Housing budget by $200.00"),
		).toBeTruthy();
	});

	it("renders budget warning when spent > 80% and <= 100% of budget", () => {
		const budgets = [{ category: "Transport", budget: 1000, spent: 900 }];
		render(<SmartInsights {...defaultProps} budgets={budgets} />);
		expect(screen.getByText("Budget Warning")).toBeTruthy();
		expect(
			screen.getByText("Your Transport spending is at 90% of budget"),
		).toBeTruthy();
	});

	it("renders high food spending insight when food > 40% of total expenses", () => {
		const expenses = [
			{
				id: "1",
				name: "Groceries",
				amount: 500,
				category: "Food",
				date: "2023-10-10",
			},
			{
				id: "2",
				name: "Gas",
				amount: 100,
				category: "Transport",
				date: "2023-10-11",
			},
		];
		render(
			<SmartInsights
				{...defaultProps}
				expenses={expenses}
				totalExpenses={600}
			/>,
		);
		expect(screen.getByText("Food Spending High")).toBeTruthy();
		expect(
			screen.getByText(
				"83% of your expenses are on food. Consider meal planning.",
			),
		).toBeTruthy();
	});

	it("renders multiple insights simultaneously", () => {
		const budgets = [{ category: "Housing", budget: 1000, spent: 1200 }];
		render(
			<SmartInsights {...defaultProps} savingsRate={5} budgets={budgets} />,
		);
		expect(screen.getByText("Low Savings Rate")).toBeTruthy();
		expect(screen.getByText("Over Budget!")).toBeTruthy();
	});
});
