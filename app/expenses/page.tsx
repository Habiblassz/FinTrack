"use client";

import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { useFinanceContext } from "@/context/FinanceContext";
import CategoryPieChart from "@/components/features/expenses/CategoryPieChart";
import { ExpenseForm } from "@/components/features/expenses/ExpenseForm";
import ExpenseList from "@/components/features/expenses/ExpenseList";
import { Expense } from "@/types/finance";
import CsvImportModal from "@/components/features/expenses/CsvImportModal";

export default function ExpensesPage() {
	const [showAddExpense, setShowAddExpense] = useState(false);
	const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

	const [showImport, setShowImport] = useState(false);
	const { importExpenses } = useFinanceContext();

	const {
		financialData,
		calculations,
		addExpense,
		deleteExpense,
		updateExpense,
	} = useFinanceContext();

	const handleEditClick = (expense: Expense) => {
		setEditingExpense(expense);
		setShowAddExpense(true);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleFormSubmit = (data: Omit<Expense, "id">) => {
		if (editingExpense) {
			updateExpense(editingExpense.id, data);
			setEditingExpense(null);
		} else {
			addExpense(data);
		}
		setShowAddExpense(false);
	};

	const handleCancel = () => {
		setShowAddExpense(false);
		setEditingExpense(null);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Expense Tracker
				</h1>
				<button
					onClick={() => {
						setEditingExpense(null);
						setShowAddExpense(!showAddExpense);
					}}
					className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-colors shadow-sm shadow-emerald-500/30">
					<Plus size={20} />
					{showAddExpense && !editingExpense ? "Close Form" : "Add Expense"}
				</button>
				<button
					onClick={() => setShowImport(true)}
					className="flex items-center gap-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
					<Upload size={20} />
					Import CSV
				</button>
			</div>

			{showAddExpense && (
				<ExpenseForm
					initialData={editingExpense}
					onSubmit={handleFormSubmit}
					onCancel={handleCancel}
				/>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<CategoryPieChart data={calculations.categorySpending} />
				<ExpenseList
					expenses={financialData.expenses}
					onDelete={deleteExpense}
					onEdit={handleEditClick}
				/>
			</div>
			<CsvImportModal
				isOpen={showImport}
				onClose={() => setShowImport(false)}
				onImport={importExpenses}
			/>
		</div>
	);
}
