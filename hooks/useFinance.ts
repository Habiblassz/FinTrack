import { useMemo } from "react";
import { Expense, FinancialData } from "@/types/finance";
import {
	calculateTrendData,
	calculateCategorySpending,
	calculateSavingsRate,
	getCurrentMonthISO,
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

		setFinancialData((prev) => ({
			...prev,
			expenses: [...prev.expenses, newExpense],

			currentSavings: prev.currentSavings - newExpense.amount,
		}));
	};

	const deleteExpense = (id: string) => {
		const expenseToDelete = financialData.expenses.find((e) => e.id === id);
		if (!expenseToDelete) return;

		setFinancialData((prev) => ({
			...prev,
			expenses: prev.expenses.filter((exp) => exp.id !== id),
			currentSavings: prev.currentSavings + expenseToDelete.amount,
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

	const processedData = useMemo(() => {
		const currentMonthISO = getCurrentMonthISO();

		const monthlyExpenses = financialData.expenses.filter((e) =>
			e.date.startsWith(currentMonthISO)
		);

		const totalMonthlyExpenses = monthlyExpenses.reduce(
			(sum, exp) => sum + exp.amount,
			0
		);

		const budgetsWithLiveSpending = financialData.budgets.map((b) => {
			const spentThisMonth = monthlyExpenses
				.filter((e) => e.category === b.category)
				.reduce((sum, e) => sum + e.amount, 0);

			return {
				...b,
				spent: spentThisMonth,
			};
		});

		const trendData = calculateTrendData(
			financialData.expenses,
			financialData.monthlyIncome
		);

		const categorySpending = calculateCategorySpending(financialData.expenses);

		const savingsRate = calculateSavingsRate(
			financialData.monthlyIncome,
			totalMonthlyExpenses
		);

		return {
			financialData: {
				...financialData,
				budgets: budgetsWithLiveSpending,
			},
			calculations: {
				totalExpenses: totalMonthlyExpenses,
				trendData,
				categorySpending,
				savingsRate,
				totalBalance: financialData.currentSavings,
			},
		};
	}, [financialData]);

	return {
		financialData: processedData.financialData,
		calculations: processedData.calculations,
		addExpense,
		deleteExpense,
		updateBudget,
		setFinancialData,
	};
};
