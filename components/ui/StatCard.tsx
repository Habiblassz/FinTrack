"use client";

import { StatCardProps } from "@/types/finance";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function StatCard({
	icon: Icon,
	title,
	value,
	trend,
	color,
}: StatCardProps) {
	const [formattedValue, setFormattedValue] = useState("");

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	useEffect(() => {
		const formatValue = (val: number) =>
			new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(val);

		setFormattedValue(formatValue(value));
	}, [value]);

	return (
		<div
			className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor} transition-all hover:shadow-lg`}>
			<div className="flex items-center gap-2">
				<div
					className={`p-2 rounded-lg flex items-center justify-center ${color}`}>
					<Icon size={16} className="text-white" />
				</div>
				<p className={`text-sm font-medium ${textPrimary}`}>{title}</p>
			</div>

			{/* Value */}
			<h3 className={`text-3xl font-bold ${textPrimary} mt-3`}>
				{formattedValue || (
					<span className="invisible">{`$${value.toFixed(2)}`}</span>
				)}
			</h3>

			{/* Trend */}
			{trend && (
				<p
					className={`text-sm mt-2 flex items-center gap-1 ${
						trend.positive ? "text-emerald-500" : "text-red-500"
					}`}>
					{trend.text}
				</p>
			)}
		</div>
	);
}
