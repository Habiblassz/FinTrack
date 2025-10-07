import { Expense, TrendData, CategorySpending } from "@/types/finance";

export const calculateTrendData = (
	expenses: Expense[],
	monthlyIncome: number
): TrendData[] => {
	const monthlyData: { [key: string]: { expenses: number } } = {};

	expenses.forEach((expense) => {
		const month = expense.date.substring(0, 7);
		if (!monthlyData[month]) {
			monthlyData[month] = { expenses: 0 };
		}
		monthlyData[month].expenses += expense.amount;
	});

	return Object.entries(monthlyData)
		.map(([month, data]) => ({
			month: new Date(month + "-01").toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
			}),
			income: monthlyIncome,
			expenses: data.expenses,
			savings: monthlyIncome - data.expenses,
		}))
		.slice(-6);
};

export const calculateCategorySpending = (
	expenses: Expense[]
): CategorySpending[] => {
	const categoryTotals: { [key: string]: number } = {};
	const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

	expenses.forEach((expense) => {
		categoryTotals[expense.category] =
			(categoryTotals[expense.category] || 0) + expense.amount;
	});

	return Object.entries(categoryTotals).map(([name, value]) => ({
		name,
		value,
		percentage: total > 0 ? (value / total) * 100 : 0,
	}));
};

export const calculateSavingsRate = (
	income: number,
	expenses: number
): number => {
	return income > 0 ? ((income - expenses) / income) * 100 : 0;
};

export interface BudgetStatus {
	percentage: number;
	isOverBudget: boolean;
	remaining: number;
}

export const getBudgetStatus = (
	spent: number,
	budget: number
): BudgetStatus => {
	const percentage = (spent / budget) * 100;
	return {
		percentage,
		isOverBudget: percentage > 100,
		remaining: budget - spent,
	};
};
