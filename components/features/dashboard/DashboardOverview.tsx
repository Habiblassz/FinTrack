"use client";

import { useState } from "react";
import StatCard from "@/components/ui/StatCard";
import { DashboardOverviewProps } from "@/types/finance";
import { Wallet, TrendingUp, Receipt, Target, Pencil } from "lucide-react";
import { useFinanceContext } from "@/context/FinanceContext";

export default function DashboardOverview({
	totalBalance,
	monthlyIncome,
	totalExpenses,
	currentSavings,
	savingsRate,
}: DashboardOverviewProps) {
	const { updateBalance } = useFinanceContext();
	const [isEditing, setIsEditing] = useState(false);
	const [tempIncome, setTempIncome] = useState(monthlyIncome.toString());

	const getTrendData = () => {
		const expenseTrend =
			totalExpenses < monthlyIncome * 0.7 ? "positive" : "negative";

		return {
			expenses: {
				positive: expenseTrend === "positive",
				text:
					expenseTrend === "positive"
						? "Good spending control"
						: "Review your expenses",
			},
			savings: {
				positive: savingsRate > 20,
				text: `${savingsRate.toFixed(1)}% savings rate`,
			},
		};
	};

	const trends = getTrendData();

	const handleIncomeUpdate = () => {
		const val = parseFloat(tempIncome);
		if (val > 0) {
			updateBalance(val);
			setIsEditing(false);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
			<StatCard
				icon={Wallet}
				title="Total Balance"
				value={totalBalance}
				color="bg-emerald-500"
			/>
			{/* Editable Income Card */}
			<div className="relative group h-full">
				{!isEditing ? (
					<div
						onClick={() => setIsEditing(true)}
						className="cursor-pointer h-full">
						<StatCard
							icon={TrendingUp}
							title="Monthly Income"
							value={monthlyIncome}
							color="bg-blue-500"
						/>
						<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
							<Pencil size={14} className="text-white opacity-80" />
						</div>
					</div>
				) : (
					<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-blue-200 dark:border-blue-900 h-full flex flex-col justify-center animate-in fade-in duration-200">
						<label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
							Set Monthly Income
						</label>
						<div className="flex items-center gap-1 mb-2">
							<span className="text-gray-500">$</span>
							<input
								type="number"
								value={tempIncome}
								onChange={(e) => setTempIncome(e.target.value)}
								className="w-full border-b border-gray-300 dark:border-slate-600 bg-transparent text-lg font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
								autoFocus
							/>
						</div>
						<div className="flex gap-2">
							<button
								onClick={handleIncomeUpdate}
								className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors">
								Save
							</button>
							<button
								onClick={() => setIsEditing(false)}
								className="text-gray-500 dark:text-gray-400 text-xs px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
			<StatCard
				icon={Receipt}
				title="Monthly Expenses"
				value={totalExpenses}
				trend={trends.expenses}
				color="bg-amber-500"
			/>
			<StatCard
				icon={Target}
				title="Savings Goal"
				value={currentSavings}
				trend={trends.savings}
				color="bg-purple-500"
			/>
		</div>
	);
}
