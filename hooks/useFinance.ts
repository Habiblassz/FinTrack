import { useMemo } from "react";
import { Expense, FinancialData } from "@/types/finance";
import {
	calculateTrendData,
	calculateCategorySpending,
	calculateSavingsRate,
} from "@/lib/calculations";
import { useLocalStorage } from "@/context/useLocalStorage";

export const useFinance = () => {
	const [financialData, setFinancialData] = useLocalStorage<FinancialData>(
		"financial-data",
		{
			expenses: [],
			budgets: [
				{ category: "Food", budget: 500, spent: 0 },
				{ category: "Bills", budget: 300, spent: 0 },
				{ category: "Transport", budget: 200, spent: 0 },
				{ category: "Entertainment", budget: 150, spent: 0 },
			],
			monthlyIncome: 4500,
			savingsGoal: 10000,
			currentSavings: 0,
		}
	);

	const addExpense = (expense: Omit<Expense, "id">) => {
		const newExpense = {
			...expense,
			id: Date.now().toString(),
		};

		setFinancialData((prev) => {
			const updatedExpenses = [...prev.expenses, newExpense];

			// Update budget spending
			const updatedBudgets = prev.budgets.map((budget) => ({
				...budget,
				spent: updatedExpenses
					.filter((exp) => exp.category === budget.category)
					.reduce((sum, exp) => sum + exp.amount, 0),
			}));

			// Update savings based on income and expenses
			const totalExpenses = updatedExpenses.reduce(
				(sum, exp) => sum + exp.amount,
				0
			);
			const newSavings =
				prev.currentSavings + (prev.monthlyIncome - totalExpenses);

			return {
				...prev,
				expenses: updatedExpenses,
				budgets: updatedBudgets,
				currentSavings: Math.max(0, newSavings),
			};
		});
	};

	const deleteExpense = (id: string) => {
		setFinancialData((prev) => ({
			...prev,
			expenses: prev.expenses.filter((exp) => exp.id !== id),
		}));
	};

	const updateBudget = (category: string, budget: number) => {
		setFinancialData((prev) => ({
			...prev,
			budgets: prev.budgets.map((b) =>
				b.category === category ? { ...b, budget } : b
			),
		}));
	};

	const calculations = useMemo(() => {
		const totalExpenses = financialData.expenses.reduce(
			(sum, exp) => sum + exp.amount,
			0
		);
		const trendData = calculateTrendData(
			financialData.expenses,
			financialData.monthlyIncome
		);
		const categorySpending = calculateCategorySpending(financialData.expenses);
		const savingsRate = calculateSavingsRate(
			financialData.monthlyIncome,
			totalExpenses
		);

		return {
			totalExpenses,
			trendData,
			categorySpending,
			savingsRate,
			totalBalance: financialData.currentSavings,
		};
	}, [financialData]);

	return {
		financialData,
		calculations,
		addExpense,
		deleteExpense,
		updateBudget,
		setFinancialData,
	};
};
