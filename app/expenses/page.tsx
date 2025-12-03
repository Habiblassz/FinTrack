"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useFinanceContext } from "@/context/FinanceContext";
import CategoryPieChart from "@/components/features/expenses/CategoryPieChart";
import { ExpenseForm } from "@/components/features/expenses/ExpenseForm";
import ExpenseList from "@/components/features/expenses/ExpenseList";

export default function ExpensesPage() {
	const [showAddExpense, setShowAddExpense] = useState(false);
	const { financialData, calculations, addExpense, deleteExpense } =
		useFinanceContext();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Expense Tracker
				</h1>
				<button
					onClick={() => setShowAddExpense(!showAddExpense)}
					className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-colors">
					<Plus size={20} />
					Add Expense
				</button>
			</div>

			{showAddExpense && (
				<ExpenseForm
					onSubmit={addExpense}
					onCancel={() => setShowAddExpense(false)}
				/>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<CategoryPieChart data={calculations.categorySpending} />
				<ExpenseList
					expenses={financialData.expenses}
					onDelete={deleteExpense}
				/>
			</div>
		</div>
	);
}
