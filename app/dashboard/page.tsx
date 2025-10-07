"use client";

import { useFinanceContext } from "@/context/FinanceContext";
import DashboardOverview from "@/components/features/dashboard/DashboardOverview";
import ExpenseChart from "@/components/features/dashboard/ExpenseChart";
import SmartInsights from "@/components/features/dashboard/SmartInsights";
import { useTheme } from "next-themes";

export default function DashboardPage() {
	const { calculations, financialData } = useFinanceContext();

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";

	return (
		<div className={`space-y-6 ${cardBg} rounded-2xl`}>
			<div className="flex items-center justify-between pt-2 pl-2">
				<h1 className={`text-3xl font-bold ${textPrimary}`}>
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
