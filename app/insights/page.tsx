"use client";

import AnalyticsCards from "@/components/features/insights/AnalyticsCard";
import MonthlyComparison from "@/components/features/insights/MonthlyComparison";
import { useFinanceContext } from "@/context/FinanceContext";

export default function InsightsPage() {
	const { calculations, financialData } = useFinanceContext();

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
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
