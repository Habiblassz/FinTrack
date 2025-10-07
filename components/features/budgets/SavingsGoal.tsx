"use client";

import { SavingsGoalProps } from "@/types/finance";
import { useTheme } from "next-themes";

export default function SavingsGoal({
	currentSavings,
	savingsGoal,
}: SavingsGoalProps) {
	const percentage = (currentSavings / savingsGoal) * 100;

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	return (
		<div
			className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
			<h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
				Savings Goal
			</h2>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<span className={`text-lg ${textSecondary}`}>Emergency Fund</span>
					<span className={`text-lg font-semibold ${textPrimary}`}>
						${currentSavings.toFixed(2)} / ${savingsGoal.toFixed(2)}
					</span>
				</div>
				<div className={`w-full ${borderColor} rounded-full h-4`}>
					<div
						className="h-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all"
						style={{ width: `${Math.min(percentage, 100)}%` }}
					/>
				</div>
				<p className={`text-sm ${textSecondary}`}>
					{percentage.toFixed(1)}% complete • $
					{(savingsGoal - currentSavings).toFixed(2)} to go
				</p>
			</div>
		</div>
	);
}
