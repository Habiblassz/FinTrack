"use client";

import { useState } from "react";
import BudgetProgress from "@/components/features/budgets/BudgetProgress";
import SavingsGoal from "@/components/features/budgets/SavingsGoal";
import EditBudgetModal from "@/components/features/budgets/EditBudgetModal";
import { useFinanceContext } from "@/context/FinanceContext";
import { Budget } from "@/types/finance";

export default function BudgetsPage() {
	const { financialData, updateBudget } = useFinanceContext();
	const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

	const currentMonthName = new Date().toLocaleString("default", {
		month: "long",
	});

	const handleSaveBudget = (amount: number) => {
		if (editingBudget) {
			updateBudget(editingBudget.category, amount);
			setEditingBudget(null);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Budgets & Goals
				</h1>
				<span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
					{currentMonthName} Budget
				</span>
			</div>

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

			<SavingsGoal
				currentSavings={financialData.currentSavings}
				savingsGoal={financialData.savingsGoal}
			/>

			{editingBudget && (
				<EditBudgetModal
					isOpen={!!editingBudget}
					onClose={() => setEditingBudget(null)}
					category={editingBudget.category}
					currentBudget={editingBudget.budget}
					onSave={handleSaveBudget}
				/>
			)}
		</div>
	);
}
