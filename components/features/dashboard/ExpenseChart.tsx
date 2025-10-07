"use client";

import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { ExpenseChartProps, TooltipProps } from "@/types/finance";
import { useTheme } from "next-themes";

export default function ExpenseChart({ trendData }: ExpenseChartProps) {
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div
					className={`${cardBg} p-4 rounded-lg shadow-lg border ${borderColor}`}>
					<p className={`font-semibold ${textPrimary}`}>{label}</p>
					<p className="text-emerald-600">
						Income: {formatCurrency(payload[0]?.value)}
					</p>
					<p className="text-red-500">
						Expenses: {formatCurrency(payload[1]?.value)}
					</p>
					<p className="text-blue-500">
						Savings: {formatCurrency(payload[0]?.value - payload[1]?.value)}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div
			className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
			<h2 className={`text-xl font-semibold ${textSecondary} mb-4`}>
				Income vs Expenses Trend
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={trendData}>
					<defs>
						<linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#e5e7eb"
						className="dark:stroke-slate-600"
					/>
					<XAxis
						dataKey="month"
						stroke="#6b7280"
						className="dark:stroke-slate-400"
					/>
					<YAxis
						stroke="#6b7280"
						className="dark:stroke-slate-400"
						tickFormatter={formatCurrency}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Area
						type="monotone"
						dataKey="income"
						stroke="#10b981"
						fillOpacity={1}
						fill="url(#colorIncome)"
						name="Income"
					/>
					<Area
						type="monotone"
						dataKey="expenses"
						stroke="#ef4444"
						fillOpacity={1}
						fill="url(#colorExpenses)"
						name="Expenses"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
