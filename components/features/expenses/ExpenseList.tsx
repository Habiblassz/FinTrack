"use client";

import { Trash2 } from "lucide-react";
import { ExpenseListProps } from "@/types/finance";

const COLORS = {
	Food: "#10b981",
	Bills: "#3b82f6",
	Transport: "#f59e0b",
	Entertainment: "#8b5cf6",
};

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Recent Expenses
			</h2>
			<div className="space-y-3 max-h-80 overflow-y-auto">
				{expenses.length === 0 ? (
					<p className="text-gray-600 dark:text-gray-300 text-center py-8">
						No expenses yet. Add your first expense to get started!
					</p>
				) : (
					expenses.map((expense) => (
						<div
							key={expense.id}
							className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow">
							<div className="flex-1">
								<p className="font-medium text-gray-900 dark:text-white">
									{expense.name}
								</p>
								<div className="flex items-center gap-2 mt-1">
									<span
										className="px-2 py-1 rounded-lg text-xs font-medium text-white"
										style={{
											backgroundColor:
												COLORS[expense.category as keyof typeof COLORS],
										}}>
										{expense.category}
									</span>
									<span className="text-sm text-gray-600 dark:text-gray-300">
										{formatDate(expense.date)}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<span className="text-lg font-semibold text-gray-900 dark:text-white">
									${expense.amount.toFixed(2)}
								</span>
								<button
									onClick={() => onDelete(expense.id)}
									className="text-red-500 hover:text-red-700 transition-colors">
									<Trash2 size={18} />
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
