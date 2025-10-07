"use client";

import { AnalyticsCardsProps } from "@/types/finance";
import { useTheme } from "next-themes";

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
	const averageDailySpending = totalExpenses / 30; // Approximate monthly average

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div
				className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					📊 Spending Patterns
				</h3>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className={`${textSecondary}`}>Average daily spending</span>
						<span className={`font-semibold ${textPrimary}`}>
							${averageDailySpending.toFixed(2)}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={`${textSecondary}`}>Top category</span>
						<span className={`font-semibold ${textPrimary}`}>
							{topCategory} (
							{categorySpending
								.find((cat) => cat.name === topCategory)
								?.percentage.toFixed(0) || 0}
							%)
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={`${textSecondary}`}>Savings rate</span>
						<span
							className={`font-semibold ${
								savingsRate > 20 ? "text-emerald-500" : "text-amber-500"
							}`}>
							{savingsRate.toFixed(1)}%
						</span>
					</div>
				</div>
			</div>

			<div
				className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
				<h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>
					📈 Financial Health
				</h3>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className={`${textSecondary}`}>Expense to Income Ratio</span>
						<span className={`font-semibold ${textPrimary}`}>
							{((totalExpenses / monthlyIncome) * 100).toFixed(1)}%
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={`${textSecondary}`}>Monthly Savings</span>
						<span className="font-semibold text-emerald-500">
							${(monthlyIncome - totalExpenses).toFixed(2)}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className={`${textSecondary}`}>Financial Buffer</span>
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
