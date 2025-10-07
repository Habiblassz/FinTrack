"use client";

import { useTheme } from "next-themes";

export default function ProfilePage() {
	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";
	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
				Profile & Settings
			</h1>

			<div
				className={`${cardBg} rounded-2xl p-6 shadow-md border ${borderColor}`}>
				<h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
					Account Information
				</h2>
				<div className="space-y-4">
					<div>
						<label className={`text-sm ${textSecondary}`}>Full Name</label>
						<input
							type="text"
							defaultValue="John Doe"
							className={`w-full mt-1 px-4 py-2 rounded-xl border ${borderColor} ${cardBg} ${textPrimary}`}
						/>
					</div>
					<div>
						<label className={`text-sm ${textSecondary}`}>Email</label>
						<input
							type="email"
							defaultValue="johndoe@email.com"
							className={`w-full mt-1 px-4 py-2 rounded-xl border ${borderColor} ${cardBg} ${textPrimary}`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
