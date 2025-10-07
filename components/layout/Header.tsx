"use client";

import { Wallet, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
	const { theme, setTheme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

	return (
		<header
			className={`rounded-2xl p-4 mb-6 shadow-md border ${borderColor} ${cardBg}`}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-3 rounded-xl">
						<Wallet size={28} className="text-white" />
					</div>
					<div>
						<h1 className={`text-2xl font-bold ${textPrimary}`}>FinTrack</h1>
						<p className={`text-sm ${textSecondary}`}>
							Personal Finance Dashboard
						</p>
					</div>
				</div>
				<button
					onClick={() => setTheme(!isDark ? "dark" : "light")}
					className={`p-3 rounded-xl ${
						theme === "dark" ? "bg-slate-700" : "bg-gray-200"
					} transition-colors`}>
					{theme === "dark" ? (
						<Moon className="text-yellow-400" size={24} />
					) : (
						<Sun className="text-amber-500" size={24} />
					)}
				</button>
			</div>
		</header>
	);
}
