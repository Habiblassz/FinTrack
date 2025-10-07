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
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div
					className={`${cardBg} p-4 rounded-lg shadow-lg border ${borderColor}`}>
					<p className={`font-semibold ${textPrimary}`}>{label}</p>
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
		<div
			className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
			<h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
				Monthly Comparison
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={trendData}>
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
					<Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
					<Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
