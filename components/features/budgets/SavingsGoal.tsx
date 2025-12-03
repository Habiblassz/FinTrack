"use client";

import { SavingsGoalProps } from "@/types/finance";

export default function SavingsGoal({
	currentSavings,
	savingsGoal,
}: SavingsGoalProps) {
	const percentage = (currentSavings / savingsGoal) * 100;

	return (
		<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Savings Goal
			</h2>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-lg text-gray-600 dark:text-gray-300">
						Emergency Fund
					</span>
					<span className="text-lg font-semibold text-gray-900 dark:text-white">
						${currentSavings.toFixed(2)} / ${savingsGoal.toFixed(2)}
					</span>
				</div>
				<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4">
					<div
						className="h-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all"
						style={{ width: `${Math.min(percentage, 100)}%` }}
					/>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-300">
					{percentage.toFixed(1)}% complete • $
					{(savingsGoal - currentSavings).toFixed(2)} to go
				</p>
			</div>
		</div>
	);
}
