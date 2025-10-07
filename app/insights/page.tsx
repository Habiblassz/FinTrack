"use client";

import AnalyticsCards from "@/components/features/insights/AnalyticsCard";
import MonthlyComparison from "@/components/features/insights/MonthlyComparison";
import { useFinanceContext } from "@/context/FinanceContext";
import { useTheme } from "next-themes";

export default function InsightsPage() {
	const { calculations, financialData } = useFinanceContext();
	const { theme } = useTheme();

	const isDark = theme === "dark";
	const textPrimary = isDark ? "text-white" : "text-gray-900";

	return (
		<div className="space-y-6">
			<h1 className={`text-3xl font-bold ${textPrimary}`}>
				Insights & Analytics
			</h1>

			<MonthlyComparison trendData={calculations.trendData} />

			<AnalyticsCards
				totalExpenses={calculations.totalExpenses}
				categorySpending={calculations.categorySpending}
				savingsRate={calculations.savingsRate}
				monthlyIncome={financialData.monthlyIncome}
			/>
		</div>
	);
}
