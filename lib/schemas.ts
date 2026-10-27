import { z } from "zod";

export const ExpenseSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Name is required"),
	amount: z.number().positive("Amount must be positive"),
	category: z.string().min(1, "Category is required"),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
});

export const BudgetSchema = z.object({
	category: z.string().min(1, "Category is required"),
	budget: z.number().nonnegative("Budget cannot be negative"),
	spent: z.number().nonnegative("Spent amount cannot be negative"),
});

export const FinancialDataSchema = z.object({
	expenses: z.array(ExpenseSchema),
	budgets: z.array(BudgetSchema),
	monthlyIncome: z.number().nonnegative(),
	savingsGoal: z.number().nonnegative(),
	currentSavings: z.number(),
});

export const ExpenseInputSchema = ExpenseSchema.omit({ id: true });
