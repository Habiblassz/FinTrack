"use client";

import { AnalyticsCardsProps } from "@/types/finance";

export default function AnalyticsCards({
	totalExpenses,
	categorySpending,
	savingsRate,
	monthlyIncome,
}: AnalyticsCardsProps) {
	const getTopCategory = () => {
		if (categorySpending.length === 0) return "None";
		return categorySpending.reduce((prev, current) =>
			prev.value > current.value ? prev : current
		).name;
	};

	const topCategory = getTopCategory();
	const averageDailySpending = totalExpenses / 30;

	const cardClass =
		"bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700";
	const labelClass = "text-gray-600 dark:text-gray-300";
	const valueClass = "font-semibold text-gray-900 dark:text-white";

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div className={cardClass}>
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					📊 Spending Patterns
				</h3>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className={labelClass}>Average daily spending</span>
						<span className={valueClass}>
							${averageDailySpending.toFixed(2)}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={labelClass}>Top category</span>
						<span className={valueClass}>
							{topCategory} (
							{categorySpending
								.find((cat) => cat.name === topCategory)
								?.percentage.toFixed(0) || 0}
							%)
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={labelClass}>Savings rate</span>
						<span
							className={`font-semibold ${
								savingsRate > 20 ? "text-emerald-500" : "text-amber-500"
							}`}>
							{savingsRate.toFixed(1)}%
						</span>
					</div>
				</div>
			</div>

			<div className={cardClass}>
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					📈 Financial Health
				</h3>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className={labelClass}>Expense to Income Ratio</span>
						<span className={valueClass}>
							{((totalExpenses / monthlyIncome) * 100).toFixed(1)}%
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={labelClass}>Monthly Savings</span>
						<span className="font-semibold text-emerald-500">
							${(monthlyIncome - totalExpenses).toFixed(2)}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={labelClass}>Financial Buffer</span>
						<span
							className={`font-semibold ${
								savingsRate > 30 ? "text-emerald-500" : "text-amber-500"
							}`}>
							{savingsRate > 30
								? "Excellent"
								: savingsRate > 15
								? "Good"
								: "Needs Improvement"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
