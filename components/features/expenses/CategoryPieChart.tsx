"use client";

import { CategoryPieChartProps, PieTooltipProps } from "@/types/finance";
import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
	Food: "#10b981",
	Bills: "#3b82f6",
	Transport: "#f59e0b",
	Entertainment: "#8b5cf6",
};

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
	const CustomTooltip = ({ active, payload }: PieTooltipProps) => {
		const { theme } = useTheme();

		const isDark = theme === "dark";
		const cardBg = isDark ? "bg-slate-800" : "bg-white";
		const textPrimary = isDark ? "text-white" : "text-gray-900";
		const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
		const borderColor = isDark ? "border-slate-700" : "border-gray-200";

		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div
					className={`${cardBg} p-3 rounded-lg shadow-lg border ${borderColor}`}>
					<p className={`font-semibold ${textPrimary}`}>{data.name}</p>
					<p className={`text-sm ${textSecondary}`}>
						Amount: ${data.value.toFixed(2)}
					</p>
					<p className={`text-sm ${textSecondary}`}>
						Percentage: {data.percentage?.toFixed(1)}%
					</p>
				</div>
			);
		}
		return null;
	};

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	return (
		<div
			className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
			<h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
				Category Breakdown
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						labelLine={false}
						// label={({ name, percentage }: ChartDataInput) => (
						// 	<text>
						// 		{name} {percentage?.toFixed(0) || "0"}%
						// 	</text>
						// )}
						outerRadius={100}
						fill="#8884d8"
						dataKey="value">
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"}
							/>
						))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
