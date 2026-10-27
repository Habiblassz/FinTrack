import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DashboardOverview from "./DashboardOverview";
import { useFinanceContext } from "@/context/FinanceContext";

// Mock the context
vi.mock("@/context/FinanceContext", () => ({
	useFinanceContext: vi.fn(),
}));

// Mock StatCard to simplify assertions
vi.mock("@/components/ui/StatCard", () => ({
	default: ({
		title,
		value,
		trend,
	}: {
		title: string;
		value: number | string;
		trend?: { text: string };
	}) => (
		<div data-testid={`stat-card-${title}`}>
			<span>
				{title}: {value}
			</span>
			{trend && <span data-testid={`trend-${title}`}>{trend.text}</span>}
		</div>
	),
}));

describe("DashboardOverview Component", () => {
	const mockUpdateBalance = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useFinanceContext).mockReturnValue({
			updateBalance: mockUpdateBalance,
		} as unknown as ReturnType<typeof useFinanceContext>);
	});

	const defaultProps = {
		totalBalance: 5000,
		monthlyIncome: 3000,
		totalExpenses: 1500,
		currentSavings: 1000,
		savingsRate: 25,
		savingsGoal: 10000,
	};

	it("renders all stat cards with positive trends", () => {
		render(<DashboardOverview {...defaultProps} />);

		// Assert elements exist
		expect(screen.getByTestId("stat-card-Total Balance")).toBeTruthy();
		expect(screen.getByTestId("stat-card-Monthly Income")).toBeTruthy();

		// 1500 < 3000 * 0.7 (2100) -> positive trend
		expect(screen.getByTestId("trend-Monthly Expenses").textContent).toContain(
			"Good spending control",
		);

		// 25 > 20 -> positive savings trend
		expect(screen.getByTestId("trend-Savings Goal").textContent).toContain(
			"25.0% savings rate",
		);
	});

	it("renders negative trends when expenses are high and savings are low", () => {
		render(
			<DashboardOverview
				{...defaultProps}
				totalExpenses={2500}
				savingsRate={10}
			/>,
		);

		expect(screen.getByTestId("trend-Monthly Expenses").textContent).toContain(
			"Review your expenses",
		);
		expect(screen.getByTestId("trend-Savings Goal").textContent).toContain(
			"10.0% savings rate",
		);
	});

	it("handles the inline income editing flow", () => {
		render(<DashboardOverview {...defaultProps} />);

		// Open edit mode
		const incomeCard = screen.getByTestId(
			"stat-card-Monthly Income",
		).parentElement;
		fireEvent.click(incomeCard!);

		// Change value
		const input = screen.getByDisplayValue("3000");
		fireEvent.change(input, { target: { value: "4000" } });

		// Save
		fireEvent.click(screen.getByText("Save"));

		expect(mockUpdateBalance).toHaveBeenCalledWith(4000);
	});

	it("cancels the inline income edit without saving", () => {
		render(<DashboardOverview {...defaultProps} />);

		// Open edit mode
		fireEvent.click(
			screen.getByTestId("stat-card-Monthly Income").parentElement!,
		);

		// Change value
		const input = screen.getByDisplayValue("3000");
		fireEvent.change(input, { target: { value: "4000" } });

		// Cancel
		fireEvent.click(screen.getByText("Cancel"));

		expect(mockUpdateBalance).not.toHaveBeenCalled();

		// Assert element does not exist
		expect(screen.queryByText("Save")).toBeNull();
	});
});
