"use client";

import { Trash2, Pencil, Receipt } from "lucide-react";
import { ExpenseListProps } from "@/types/finance";
import EmptyState from "@/components/ui/EmptyState";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_COLORS: { [key: string]: string } = {
	Food: "#10b981",
	Bills: "#3b82f6",
	Transport: "#f59e0b",
	Entertainment: "#8b5cf6",
	Shopping: "#ec4899",
	Health: "#ef4444",
	Other: "#6b7280",
};

const getCategoryColor = (category: string) => {
	return CATEGORY_COLORS[category] || CATEGORY_COLORS["Other"];
};

export default function ExpenseList({
	expenses,
	onDelete,
	onEdit,
}: ExpenseListProps) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 h-full flex flex-col">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white">
					Recent Expenses
				</h2>
				<span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
					{expenses.length} items
				</span>
			</div>

			{expenses.length === 0 ? (
				<EmptyState
					title="No expenses yet"
					message="Start tracking your spending to see analytics."
					icon={Receipt}
				/>
			) : (
				<div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1 max-h-[500px]">
					<AnimatePresence initial={false}>
						{expenses.map((expense, index) => (
							<motion.div
								key={expense.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ delay: index * 0.05 }}
								className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-gray-200 dark:hover:border-slate-600 transition-all shadow-sm hover:shadow-md">
								<div className="flex items-center gap-4 mb-3 sm:mb-0">
									<div
										className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0"
										style={{
											backgroundColor: getCategoryColor(expense.category),
										}}>
										{expense.category.charAt(0)}
									</div>

									<div>
										<p className="font-semibold text-gray-900 dark:text-white text-base">
											{expense.name}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
												{formatDate(expense.date)}
											</span>
											<span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600" />
											<span className="text-xs text-gray-500 dark:text-gray-400">
												{expense.category}
											</span>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-14 sm:pl-0">
									<span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">
										${expense.amount.toFixed(2)}
									</span>

									<div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
										<button
											onClick={() => onEdit(expense)}
											className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-colors">
											<Pencil size={18} />
										</button>
										<button
											onClick={() => onDelete(expense.id)}
											className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
											<Trash2 size={18} />
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			)}
		</div>
	);
}
