"use client";

import { CategoryPieChartProps, PieTooltipProps } from "@/types/finance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CATEGORY_COLORS: { [key: string]: string } = {
	Food: "#10b981",
	Bills: "#3b82f6",
	Transport: "#f59e0b",
	Entertainment: "#8b5cf6",
	Shopping: "#ec4899",
	Health: "#ef4444",
	Other: "#6b7280",
};

const getCategoryColor = (category: string) => {
	return CATEGORY_COLORS[category] || "#94a3b8";
};

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
	const CustomTooltip = ({ active, payload }: PieTooltipProps) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
					<p className="font-semibold text-gray-900 dark:text-white">
						{data.name}
					</p>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						${data.value.toFixed(2)} ({data.percentage?.toFixed(1)}%)
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Category Breakdown
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={100}
						paddingAngle={5}
						dataKey="value">
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={getCategoryColor(entry.name)}
								strokeWidth={0}
							/>
						))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
