import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import MonthlyComparison from "./MonthlyComparison";
import { useFinanceContext } from "@/context/FinanceContext";

vi.mock("next-themes", () => ({
	useTheme: vi.fn(() => ({ theme: "light" })),
}));

vi.mock("@/context/FinanceContext", () => ({
	useFinanceContext: vi.fn(),
}));

vi.mock("recharts", () => {
	const OriginalModule = vi.importActual("recharts");
	return {
		...OriginalModule,
		ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
			<div data-testid="responsive-container">{children}</div>
		),
		AreaChart: ({ children }: { children: React.ReactNode }) => (
			<div data-testid="area-chart">{children}</div>
		),
		Area: () => <div data-testid="area-mock" />,
		XAxis: () => <div data-testid="xaxis-mock" />,
		YAxis: () => <div data-testid="yaxis-mock" />,
		CartesianGrid: () => <div data-testid="grid-mock" />,
		ReferenceLine: () => <div data-testid="reference-line-mock" />,
		Tooltip: (props: {
			content: React.ReactElement<{
				active?: boolean;
				payload?: Array<{ value: number }>;
				label?: string;
			}>;
		}) => {
			const Content = props.content.type as React.FC<{
				active?: boolean;
				payload?: Array<{ value: number }>;
				label?: string;
			}>;
			return (
				<div data-testid="tooltip-mock">
					<Content
						active={true}
						payload={[{ value: 5000 }, { value: 3000 }]}
						label="Jan"
					/>
					<Content active={false} payload={[]} label="Feb" />
				</div>
			);
		},
	};
});

describe("MonthlyComparison Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useFinanceContext).mockReturnValue({
			financialData: { monthlyIncome: 4000 },
		} as unknown as ReturnType<typeof useFinanceContext>);
	});

	const trendData = [
		{ month: "Jan", income: 4000, expenses: 3000, savings: 1000 },
		{ month: "Feb", income: 4000, expenses: 3500, savings: 500 },
	];

	it("renders the component and calculates tooltip totals", () => {
		render(<MonthlyComparison trendData={trendData} />);

		expect(screen.getByText("Income vs Expenses Flow")).toBeTruthy();
		expect(screen.getByTestId("responsive-container")).toBeTruthy();

		expect(screen.getByText("Income:")).toBeTruthy();
		expect(screen.getByText("$5,000")).toBeTruthy();
		expect(screen.getByText("Expenses:")).toBeTruthy();
		expect(screen.getByText("$3,000")).toBeTruthy();
		expect(screen.getByText("Net Savings:")).toBeTruthy();
		expect(screen.getByText("$2,000")).toBeTruthy();
	});
});
