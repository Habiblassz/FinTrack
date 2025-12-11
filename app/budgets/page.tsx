"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import BudgetProgress from "@/components/features/budgets/BudgetProgress";
import SavingsGoal from "@/components/features/budgets/SavingsGoal";
import EditBudgetModal from "@/components/features/budgets/EditBudgetModal";
import AddBudgetModal from "@/components/features/budgets/AddBudgetModal";
import { useFinanceContext } from "@/context/FinanceContext";
import { Budget } from "@/types/finance";

export default function BudgetsPage() {
	const { financialData, updateBudget, addBudget } = useFinanceContext();
	const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
	const [showAddModal, setShowAddModal] = useState(false);

	const currentMonthName = new Date().toLocaleString("default", {
		month: "long",
	});

	const handleSaveBudget = (amount: number) => {
		if (editingBudget) {
			updateBudget(editingBudget.category, amount);
			setEditingBudget(null);
		}
	};

	const handleAddBudget = (category: string, amount: number) => {
		addBudget(category, amount);
		setShowAddModal(false);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Budgets & Goals
					</h1>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
						Track your spending limits for {currentMonthName}
					</p>
				</div>

				<div className="flex items-center gap-3">
					<span className="hidden md:inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
						{currentMonthName} Budget
					</span>
					{/* ADD BUDGET BUTTON */}
					<button
						onClick={() => setShowAddModal(true)}
						className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-colors shadow-sm">
						<Plus size={20} />
						<span className="font-medium">New Category</span>
					</button>
				</div>
			</div>

			{/* BUDGET GRID */}
			{financialData.budgets.length === 0 ? (
				// Empty State
				<div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200 dark:border-slate-700">
					<p className="text-gray-500 dark:text-gray-400">
						You haven&apos;t set any budgets yet.
					</p>
					<button
						onClick={() => setShowAddModal(true)}
						className="text-emerald-500 font-medium mt-2 hover:underline">
						Create your first budget category
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{financialData.budgets.map((budget, idx) => (
						<BudgetProgress
							key={idx}
							category={budget.category}
							spent={budget.spent}
							budget={budget.budget}
							onEdit={() => setEditingBudget(budget)}
						/>
					))}
				</div>
			)}

			{/* SAVINGS GOAL */}
			<SavingsGoal
				currentSavings={financialData.currentSavings}
				savingsGoal={financialData.savingsGoal}
			/>

			{/* EDIT MODAL */}
			{editingBudget && (
				<EditBudgetModal
					isOpen={!!editingBudget}
					onClose={() => setEditingBudget(null)}
					category={editingBudget.category}
					currentBudget={editingBudget.budget}
					onSave={handleSaveBudget}
				/>
			)}

			{/* ADD MODAL */}
			<AddBudgetModal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				onSave={handleAddBudget}
			/>
		</div>
	);
}
