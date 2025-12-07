"use client";

import { StatCardProps } from "@/types/finance";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StatCard({
	icon: Icon,
	title,
	value,
	trend,
	color,
}: StatCardProps) {
	const [formattedValue, setFormattedValue] = useState("");

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
	const colorBase = color.replace("bg-", "").replace("-500", "");

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={`
        relative overflow-hidden
        bg-white dark:bg-slate-800 
        rounded-2xl p-6 
        border border-gray-100 dark:border-slate-700 
        shadow-sm hover:shadow-md dark:shadow-none
        transition-all duration-300 hover:-translate-y-1
        h-full flex flex-col justify-between
      `}>
			<div
				className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl bg-${colorBase}-500 pointer-events-none`}
			/>

			<div>
				<div className="flex items-center gap-3 mb-3">
					<div
						className={`
              p-2.5 rounded-xl flex items-center justify-center 
              bg-gradient-to-br from-${colorBase}-400 to-${colorBase}-600 
              shadow-lg shadow-${colorBase}-500/20
            `}>
						<Icon size={18} className="text-white" />
					</div>
					<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{title}
					</p>
				</div>

				<h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight tabular-nums">
					{formattedValue || (
						<div className="h-9 w-24 bg-gray-200 dark:bg-slate-700 animate-pulse rounded-md" />
					)}
				</h3>
			</div>

			{trend ? (
				<div
					className={`
          mt-4 flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg w-fit
          ${
						trend.positive
							? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
							: "text-red-600 bg-red-50 dark:bg-red-900/20"
					}
        `}>
					<span>{trend.positive ? "↑" : "↓"}</span>
					<span>{trend.text}</span>
				</div>
			) : (
				<div className="mt-4 h-6"></div>
			)}
		</motion.div>
	);
}
