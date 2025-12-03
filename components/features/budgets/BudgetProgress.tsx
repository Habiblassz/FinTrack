"use client";

import { BudgetProgressProps } from "@/types/finance";
import { Pencil } from "lucide-react";

interface ExtendedProps extends BudgetProgressProps {
	onEdit: () => void;
}

export default function BudgetProgress({
	category,
	spent,
	budget,
	onEdit,
}: ExtendedProps) {
	const percentage = (spent / budget) * 100;
	const isOverBudget = percentage > 100;
	const remaining = budget - spent;

	const getProgressColor = () => {
		if (percentage > 100) return "bg-gradient-to-r from-red-500 to-red-600";
		if (percentage > 80) return "bg-gradient-to-r from-amber-400 to-amber-600";
		return "bg-gradient-to-r from-emerald-400 to-emerald-600";
	};

	return (
		<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700 relative group">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					{category}
				</h3>

				<div className="flex items-center gap-3">
					<span
						className={`text-sm font-medium ${
							isOverBudget ? "text-red-500" : "text-emerald-500"
						}`}>
						${spent.toFixed(2)} / ${budget.toFixed(2)}
					</span>
					<button
						onClick={onEdit}
						className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
						title="Edit Budget">
						<Pencil size={16} />
					</button>
				</div>
			</div>

			<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
				<div
					className={`h-3 rounded-full transition-all ${getProgressColor()}`}
					style={{ width: `${Math.min(percentage, 100)}%` }}
				/>
			</div>
			<p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
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
