"use client";

import { CategoryPieChartProps, PieTooltipProps } from "@/types/finance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
	Food: "#10b981",
	Bills: "#3b82f6",
	Transport: "#f59e0b",
	Entertainment: "#8b5cf6",
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
						Amount: ${data.value.toFixed(2)}
					</p>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Percentage: {data.percentage?.toFixed(1)}%
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
						labelLine={false}
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
