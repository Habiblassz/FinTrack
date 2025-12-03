"use client";

import { Wallet, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch by waiting for mount
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<header className="rounded-2xl p-4 mb-6 shadow-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-3 rounded-xl">
						<Wallet size={28} className="text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							FinTrack
						</h1>
						<p className="text-sm text-gray-600 dark:text-gray-300">
							Personal Finance Dashboard
						</p>
					</div>
				</div>

				{mounted && (
					<button
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="p-3 rounded-xl bg-gray-200 dark:bg-slate-700 transition-colors">
						{theme === "dark" ? (
							<Moon className="text-yellow-400" size={24} />
						) : (
							<Sun className="text-amber-500" size={24} />
						)}
					</button>
				)}
			</div>
		</header>
	);
}
