"use client";

import { BudgetProgressProps } from "@/types/finance";
import { useTheme } from "next-themes";

export default function BudgetProgress({
	category,
	spent,
	budget,
}: BudgetProgressProps) {
	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	const percentage = (spent / budget) * 100;
	const isOverBudget = percentage > 100;
	const remaining = budget - spent;

	const getProgressColor = () => {
		if (percentage > 100) return "bg-gradient-to-r from-red-500 to-red-600";
		if (percentage > 80) return "bg-gradient-to-r from-amber-400 to-amber-600";
		return "bg-gradient-to-r from-emerald-400 to-emerald-600";
	};

	return (
		<div
			className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
			<div className="flex items-center justify-between mb-3">
				<h3 className={`text-lg font-semibold ${textPrimary}`}>{category}</h3>
				<span
					className={`text-sm font-medium ${
						isOverBudget ? "text-red-500" : "text-emerald-500"
					}`}>
					${spent.toFixed(2)} / ${budget.toFixed(2)}
				</span>
			</div>
			<div className={`w-full ${borderColor} rounded-full h-3`}>
				<div
					className={`h-3 rounded-full transition-all ${getProgressColor()}`}
					style={{ width: `${Math.min(percentage, 100)}%` }}
				/>
			</div>
			<p className={`text-sm ${textSecondary} mt-2`}>
				{percentage.toFixed(0)}% used • ${Math.max(remaining, 0).toFixed(2)}{" "}
				remaining
				{isOverBudget && (
					<span className="text-red-500 ml-2">
						(Over budget by ${Math.abs(remaining).toFixed(2)})
					</span>
				)}
			</p>
		</div>
	);
}
