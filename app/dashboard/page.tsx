"use client";

import { useFinanceContext } from "@/context/FinanceContext";
import DashboardOverview from "@/components/features/dashboard/DashboardOverview";
import ExpenseChart from "@/components/features/dashboard/ExpenseChart";
import SmartInsights from "@/components/features/dashboard/SmartInsights";

export default function DashboardPage() {
	const { calculations, financialData } = useFinanceContext();

	return (
		<div className="space-y-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
			<div className="flex items-center justify-between pt-2 pl-2">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Dashboard Overview
				</h1>
			</div>

			<DashboardOverview
				totalBalance={calculations.totalBalance}
				monthlyIncome={financialData.monthlyIncome}
				totalExpenses={calculations.totalExpenses}
				currentSavings={financialData.currentSavings}
				savingsGoal={financialData.savingsGoal}
				savingsRate={calculations.savingsRate}
			/>

			<ExpenseChart trendData={calculations.trendData} />

			<SmartInsights
				expenses={financialData.expenses}
				budgets={financialData.budgets}
				savingsRate={calculations.savingsRate}
				monthlyIncome={financialData.monthlyIncome}
				totalExpenses={calculations.totalExpenses}
			/>
		</div>
	);
}
