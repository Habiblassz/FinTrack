"use client";

import { BudgetProgressProps } from "@/types/finance";
import { Pencil } from "lucide-react";

interface ExtendedProps extends BudgetProgressProps {
	onEdit?: () => void;
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

	const today = new Date();
	const daysInMonth = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		0
	).getDate();
	const daysPassed = today.getDate();
	const timeProgress = (daysPassed / daysInMonth) * 100;

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
					{onEdit && (
						<button
							onClick={onEdit}
							className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
							title="Edit Budget">
							<Pencil size={16} />
						</button>
					)}
				</div>
			</div>

			<div className="relative pt-1">
				{/* Background Bar */}
				<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
					{/* Fill Bar */}
					<div
						className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor()}`}
						style={{ width: `${Math.min(percentage, 100)}%` }}
					/>
				</div>

				<div
					className="absolute top-1 w-0.5 h-4 bg-gray-400 dark:bg-gray-500 z-10 transition-all duration-1000"
					style={{ left: `${timeProgress}%` }}
					title="Current day of month"
				/>
				<div
					className="absolute -top-4 text-[10px] text-gray-400 dark:text-gray-500 transform -translate-x-1/2 transition-all duration-1000"
					style={{ left: `${timeProgress}%` }}>
					Today
				</div>
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
