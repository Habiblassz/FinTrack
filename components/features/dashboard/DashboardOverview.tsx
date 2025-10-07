"use client";

import StatCard from "@/components/ui/StatCard";
import { DashboardOverviewProps } from "@/types/finance";
import { Wallet, TrendingUp, Receipt, Target } from "lucide-react";

export default function DashboardOverview({
	totalBalance,
	monthlyIncome,
	totalExpenses,
	currentSavings,
	savingsRate,
}: DashboardOverviewProps) {
	const getTrendData = () => {
		const expenseTrend =
			totalExpenses < monthlyIncome * 0.7 ? "positive" : "negative";

		return {
			expenses: {
				positive: expenseTrend === "positive",
				text:
					expenseTrend === "positive"
						? "Good spending control"
						: "Review your expenses",
			},
			savings: {
				positive: savingsRate > 20,
				text: `${savingsRate.toFixed(1)}% savings rate`,
			},
		};
	};

	const trends = getTrendData();

	return (
		<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
			<StatCard
				icon={Wallet}
				title="Total Balance"
				value={totalBalance}
				color="bg-emerald-500"
			/>
			<StatCard
				icon={TrendingUp}
				title="Monthly Income"
				value={monthlyIncome}
				color="bg-blue-500"
			/>
			<StatCard
				icon={Receipt}
				title="Monthly Expenses"
				value={totalExpenses}
				trend={trends.expenses}
				color="bg-amber-500"
			/>
			<StatCard
				icon={Target}
				title="Savings Goal"
				value={currentSavings}
				trend={trends.savings}
				color="bg-purple-500"
			/>
		</div>
	);
}
