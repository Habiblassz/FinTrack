"use client";

import BudgetProgress from "@/components/features/budgets/BudgetProgress";
import SavingsGoal from "@/components/features/budgets/SavingsGoal";
import { useFinanceContext } from "@/context/FinanceContext";
import { useTheme } from "next-themes";

export default function BudgetsPage() {
	const { financialData } = useFinanceContext();

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const textPrimary = isDark ? "text-white" : "text-gray-900";

	return (
		<div className="space-y-6">
			<h1 className={`text-3xl font-bold ${textPrimary}`}>Budgets & Goals</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{financialData.budgets.map((budget, idx) => (
					<BudgetProgress
						key={idx}
						category={budget.category}
						spent={budget.spent}
						budget={budget.budget}
					/>
				))}
			</div>

			<SavingsGoal
				currentSavings={financialData.currentSavings}
				savingsGoal={financialData.savingsGoal}
			/>
		</div>
	);
}
