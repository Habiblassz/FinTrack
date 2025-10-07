"use client";

import { Trash2 } from "lucide-react";
import { ExpenseListProps } from "@/types/finance";
import { useTheme } from "next-themes";

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
				Recent Expenses
			</h2>
			<div className="space-y-3 max-h-80 overflow-y-auto">
				{expenses.length === 0 ? (
					<p className={`${textSecondary} text-center py-8`}>
						No expenses yet. Add your first expense to get started!
					</p>
				) : (
					expenses.map((expense) => (
						<div
							key={expense.id}
							className={`flex items-center justify-between p-4 rounded-xl border ${borderColor} hover:shadow-md transition-shadow`}>
							<div className="flex-1">
								<p className={`font-medium ${textPrimary}`}>{expense.name}</p>
								<div className="flex items-center gap-2 mt-1">
									<span
										className="px-2 py-1 rounded-lg text-xs font-medium text-white"
										style={{
											backgroundColor:
												COLORS[expense.category as keyof typeof COLORS],
										}}>
										{expense.category}
									</span>
									<span className={`text-sm ${textSecondary}`}>
										{formatDate(expense.date)}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<span className={`text-lg font-semibold ${textPrimary}`}>
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
