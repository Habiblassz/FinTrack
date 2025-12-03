"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { MonthlyComparisonProps, TooltipProps } from "@/types/finance";
import { useTheme } from "next-themes";

export default function MonthlyComparison({
	trendData,
}: MonthlyComparisonProps) {
	// Keeping useTheme only for Recharts internal colors
	const { theme } = useTheme();
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
			return (
				<div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
					<p className="font-semibold text-gray-900 dark:text-white">{label}</p>
					<p className="text-emerald-600">
						Income: {formatCurrency(payload[0].value)}
					</p>
					<p className="text-red-500">
						Expenses: {formatCurrency(payload[1].value)}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Monthly Comparison
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={trendData}>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke={isDark ? "#475569" : "#e5e7eb"}
					/>
					<XAxis dataKey="month" stroke={isDark ? "#94a3b8" : "#6b7280"} />
					<YAxis
						stroke={isDark ? "#94a3b8" : "#6b7280"}
						tickFormatter={formatCurrency}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
					<Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
