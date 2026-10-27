import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FinanceProvider, useFinanceContext } from "./FinanceContext";
import { useFinance } from "@/hooks/useFinance";

// Mock the core hook
vi.mock("@/hooks/useFinance", () => ({
	useFinance: vi.fn(),
}));

describe("FinanceContext", () => {
	it("throws an error if useFinanceContext is used outside of FinanceProvider", () => {
		// Suppress expected React error boundary logs for this test
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const TestComponent = () => {
			useFinanceContext();
			return <div>Test</div>;
		};

		expect(() => render(<TestComponent />)).toThrow(
			"useFinanceContext must be used within a FinanceProvider",
		);

		consoleSpy.mockRestore();
	});

	it("provides finance data to children successfully", () => {
		const mockFinanceData = {
			financialData: { monthlyIncome: 5000 },
			loading: false,
		};
		vi.mocked(useFinance).mockReturnValue(
			mockFinanceData as unknown as ReturnType<typeof useFinance>,
		);

		const ConsumerComponent = () => {
			const { financialData, loading } = useFinanceContext();
			return (
				<div>
					<span data-testid="income">{financialData.monthlyIncome}</span>
					<span data-testid="loading">{loading.toString()}</span>
				</div>
			);
		};

		render(
			<FinanceProvider>
				<ConsumerComponent />
			</FinanceProvider>,
		);

		expect(screen.getByTestId("income").textContent).toBe("5000");
		expect(screen.getByTestId("loading").textContent).toBe("false");
	});
});
