"use client";

import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
} from "recharts";
import { MonthlyComparisonProps, TooltipProps } from "@/types/finance";
import { useTheme } from "next-themes";
import { useFinanceContext } from "@/context/FinanceContext";

export default function MonthlyComparison({
	trendData,
}: MonthlyComparisonProps) {
	const { theme } = useTheme();
	const { financialData } = useFinanceContext();
	const isDark = theme === "dark";

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
		if (active && payload && payload.length) {
			const income = payload[0].value;
			const expense = payload[1].value;
			const savings = income - expense;

			return (
				<div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
					<p className="font-semibold text-gray-900 dark:text-white mb-2">
						{label}
					</p>
					<div className="space-y-1 text-sm">
						<p className="text-emerald-600 flex justify-between gap-4">
							<span>Income:</span>
							<span className="font-medium">{formatCurrency(income)}</span>
						</p>
						<p className="text-red-500 flex justify-between gap-4">
							<span>Expenses:</span>
							<span className="font-medium">{formatCurrency(expense)}</span>
						</p>
						<div className="border-t border-gray-200 dark:border-slate-700 my-1 pt-1">
							<p className="text-blue-500 flex justify-between gap-4">
								<span>Net Savings:</span>
								<span className="font-bold">{formatCurrency(savings)}</span>
							</p>
						</div>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Income vs Expenses Flow
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart
					data={trendData}
					margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke={isDark ? "#334155" : "#e5e7eb"}
						vertical={false}
					/>
					<XAxis
						dataKey="month"
						stroke={isDark ? "#94a3b8" : "#6b7280"}
						tick={{ fontSize: 12 }}
						tickLine={false}
						axisLine={false}
						dy={10}
					/>
					<YAxis
						stroke={isDark ? "#94a3b8" : "#6b7280"}
						tickFormatter={formatCurrency}
						tick={{ fontSize: 12 }}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip content={<CustomTooltip />} />

					{/* Reference Line for Target Income */}
					<ReferenceLine
						y={financialData.monthlyIncome}
						stroke={isDark ? "#fbbf24" : "#f59e0b"}
						strokeDasharray="3 3"
						label={{
							position: "top",
							value: "Income Target",
							fill: isDark ? "#fbbf24" : "#f59e0b",
							fontSize: 12,
						}}
					/>

					{/* Income Area - Background */}
					<Area
						type="monotone"
						dataKey="income"
						stroke="#10b981"
						strokeWidth={2}
						fillOpacity={1}
						fill="url(#colorIncome)"
						name="Income"
					/>

					{/* Expense Area - Foreground */}
					<Area
						type="monotone"
						dataKey="expenses"
						stroke="#ef4444"
						strokeWidth={2}
						fillOpacity={1}
						fill="url(#colorExpenses)"
						name="Expenses"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
