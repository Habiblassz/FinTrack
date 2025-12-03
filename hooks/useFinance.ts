import { useState, useEffect, useMemo } from "react";
import { Expense, FinancialData } from "@/types/finance";
import {
	calculateTrendData,
	calculateCategorySpending,
	calculateSavingsRate,
	getCurrentMonthISO,
} from "@/lib/calculations";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const DEFAULT_DATA: FinancialData = {
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
};

export const useFinance = () => {
	const [user, setUser] = useState<User | null>(null);
	const [financialData, setFinancialData] =
		useState<FinancialData>(DEFAULT_DATA);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (!currentUser) {
				setFinancialData(DEFAULT_DATA);
				setLoading(false);
			}
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (!user) return;

		const userDocRef = doc(db, "users", user.uid);

		const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				setFinancialData(docSnap.data() as FinancialData);
			} else {
				setDoc(userDocRef, DEFAULT_DATA);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [user]);

	const saveData = async (newData: FinancialData) => {
		if (!user) return;
		try {
			await setDoc(doc(db, "users", user.uid), newData);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	const addExpense = (expense: Omit<Expense, "id">) => {
		const newExpense = { ...expense, id: Date.now().toString() };

		const newData = {
			...financialData,
			expenses: [...financialData.expenses, newExpense],
			currentSavings: financialData.currentSavings - newExpense.amount,
		};

		saveData(newData);
	};

	const deleteExpense = (id: string) => {
		const expenseToDelete = financialData.expenses.find((e) => e.id === id);
		if (!expenseToDelete) return;

		const newData = {
			...financialData,
			expenses: financialData.expenses.filter((exp) => exp.id !== id),
			currentSavings: financialData.currentSavings + expenseToDelete.amount,
		};

		saveData(newData);
	};

	const updateBudget = (category: string, budget: number) => {
		const newData = {
			...financialData,
			budgets: financialData.budgets.map((b) =>
				b.category === category ? { ...b, budget } : b
			),
		};
		saveData(newData);
	};

	const calculations = useMemo(() => {
		const currentMonthISO = getCurrentMonthISO();
		const monthlyExpenses = financialData.expenses.filter((e) =>
			e.date.startsWith(currentMonthISO)
		);

		const totalMonthlyExpenses = monthlyExpenses.reduce(
			(sum, exp) => sum + exp.amount,
			0
		);

		// const budgetsWithLiveSpending = financialData.budgets.map((b) => {
		// 	const spentThisMonth = monthlyExpenses
		// 		.filter((e) => e.category === b.category)
		// 		.reduce((sum, e) => sum + e.amount, 0);
		// 	return { ...b, spent: spentThisMonth };
		// });

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
			totalExpenses: totalMonthlyExpenses,
			trendData,
			categorySpending,
			savingsRate,
			totalBalance: financialData.currentSavings,
		};
	}, [financialData]);

	// const uiData = {
	// 	...financialData,
	// 	budgets: calculations
	// 		? calculations.totalBalance !== undefined
	// 			? financialData.budgets.map((b) => {
	// 					const spending = calculations.categorySpending.find(
	// 						(c) => c.name === b.category
	// 					);
	// 					return { ...b, spent: spending ? spending.value : 0 };
	// 			  })
	// 			: financialData.budgets
	// 		: financialData.budgets,
	// };

	const budgetsWithLiveSpending = financialData.budgets.map((b) => {
		const currentMonthISO = getCurrentMonthISO();
		const monthlyExpenses = financialData.expenses.filter((e) =>
			e.date.startsWith(currentMonthISO)
		);
		const spentThisMonth = monthlyExpenses
			.filter((e) => e.category === b.category)
			.reduce((sum, e) => sum + e.amount, 0);

		return { ...b, spent: spentThisMonth };
	});

	return {
		user,
		loading,
		financialData: { ...financialData, budgets: budgetsWithLiveSpending },
		calculations,
		addExpense,
		deleteExpense,
		updateBudget,
		setFinancialData,
	};
};
