"use client";

import { TrendingUp, Target, AlertTriangle, PiggyBank } from "lucide-react";
import { SmartInsightsProps } from "@/types/finance";
import { useTheme } from "next-themes";

export default function SmartInsights({
	expenses,
	budgets,
	savingsRate,
	totalExpenses,
}: SmartInsightsProps) {
	const getInsights = () => {
		const insights = [];

		// Savings rate insight
		if (savingsRate > 30) {
			insights.push({
				icon: TrendingUp,
				title: "Excellent Savings!",
				message: `You're saving ${savingsRate.toFixed(
					1
				)}% of your income. Keep it up!`,
				color: "emerald",
			});
		} else if (savingsRate < 10) {
			insights.push({
				icon: AlertTriangle,
				title: "Low Savings Rate",
				message: `Your savings rate is ${savingsRate.toFixed(
					1
				)}%. Consider reducing expenses.`,
				color: "amber",
			});
		}

		// Budget insights
		const overBudgetCategories = budgets.filter((budget) => {
			const percentage = (budget.spent / budget.budget) * 100;
			return percentage > 80;
		});

		overBudgetCategories.forEach((budget) => {
			const percentage = (budget.spent / budget.budget) * 100;
			if (percentage > 100) {
				insights.push({
					icon: AlertTriangle,
					title: "Over Budget!",
					message: `You've exceeded your ${budget.category} budget by $${(
						budget.spent - budget.budget
					).toFixed(2)}`,
					color: "red",
				});
			} else if (percentage > 80) {
				insights.push({
					icon: Target,
					title: "Budget Warning",
					message: `Your ${budget.category} spending is at ${percentage.toFixed(
						0
					)}% of budget`,
					color: "amber",
				});
			}
		});

		// Expense pattern insights
		const foodExpenses = expenses
			.filter((exp) => exp.category === "Food")
			.reduce((sum, exp) => sum + exp.amount, 0);
		const foodPercentage = (foodExpenses / totalExpenses) * 100;

		if (foodPercentage > 40) {
			insights.push({
				icon: PiggyBank,
				title: "Food Spending High",
				message: `${foodPercentage.toFixed(
					0
				)}% of your expenses are on food. Consider meal planning.`,
				color: "blue",
			});
		}

		// Default positive insight if no warnings
		if (insights.length === 0) {
			insights.push({
				icon: TrendingUp,
				title: "Great Progress!",
				message:
					"Your finances are looking healthy. Keep maintaining good habits!",
				color: "emerald",
			});
		}

		return insights;
	};

	const insights = getInsights();

	const getColorClasses = (color: string) => {
		const colors = {
			emerald:
				"bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
			amber:
				"bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
			red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
			blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
		};
		return colors[color as keyof typeof colors] || colors.emerald;
	};

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	return (
		<div
			className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
			<h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
				💡 Smart Insights
			</h2>
			<div className="space-y-3">
				{insights.map((insight, index) => {
					const IconComponent = insight.icon;
					return (
						<div
							key={index}
							className={`flex items-start gap-3 p-4 rounded-xl border ${getColorClasses(
								insight.color
							)}`}>
							<IconComponent className="mt-1" size={20} />
							<div>
								<p className="font-medium">{insight.title}</p>
								<p className="text-sm opacity-90">{insight.message}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
