import { LucideIcon } from "lucide-react";

export interface Expense {
	id: string;
	name: string;
	amount: number;
	category: string;
	date: string;
}

export interface Budget {
	category: string;
	budget: number;
	spent: number;
}

export interface BudgetStatus {
	percentage: number;
	isOverBudget: boolean;
	remaining: number;
}

export interface BudgetProgressProps {
	category: string;
	spent: number;
	budget: number;
}

export interface FinancialData {
	expenses: Expense[];
	budgets: Budget[];
	monthlyIncome: number;
	savingsGoal: number;
	currentSavings: number;
}

export interface TrendData {
	month: string;
	income: number;
	expenses: number;
	savings: number;
}

export interface CategorySpending {
	name: string;
	value: number;
	percentage: number;
}

export interface Calculations {
	totalExpenses: number;
	trendData: TrendData[];
	categorySpending: CategorySpending[];
	savingsRate: number;
	totalBalance: number;
}

export interface FinanceContextType {
	financialData: FinancialData;
	calculations: Calculations;
	addExpense: (expense: Omit<Expense, "id">) => void;
	deleteExpense: (id: string) => void;
	updateBudget: (category: string, budget: number) => void;
	setFinancialData: (data: FinancialData) => void;
}

export interface StatCardProps {
	icon: LucideIcon;
	title: string;
	value: number;
	trend?: {
		positive: boolean;
		text: string;
	};
	color: string;
}

export interface SavingsGoalProps {
	currentSavings: number;
	savingsGoal: number;
}

export interface DashboardOverviewProps {
	totalBalance: number;
	monthlyIncome: number;
	totalExpenses: number;
	currentSavings: number;
	savingsGoal: number;
	savingsRate: number;
}

export interface ExpenseChartProps {
	trendData: TrendData[];
}

export interface SmartInsightsProps {
	expenses: Expense[];
	budgets: Budget[];
	savingsRate: number;
	monthlyIncome: number;
	totalExpenses: number;
}

export interface CategoryPieChartProps {
	data: Array<{ name: string; value: number; percentage?: number }>;
}

export interface PieTooltipProps {
	active?: boolean;
	payload?: Array<{
		payload: {
			name: string;
			value: number;
			percentage?: number;
		};
	}>;
}

export interface AnalyticsCardsProps {
	totalExpenses: number;
	categorySpending: Array<{ name: string; value: number; percentage: number }>;
	savingsRate: number;
	monthlyIncome: number;
}

export interface MonthlyComparisonProps {
	trendData: TrendData[];
}

export interface TooltipProps {
	active?: boolean;
	payload?: Array<{
		value: number;
		dataKey: string;
		payload: TrendData;
	}>;
	label?: string;
}

export interface ExpenseFormProps {
	onSubmit: (expense: Omit<Expense, "id">) => void;
	onCancel: () => void;
}

export interface ExpenseListProps {
	expenses: Expense[];
	onDelete: (id: string) => void;
}
