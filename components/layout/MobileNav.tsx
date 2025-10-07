"use client";

import { MobileNavProps } from "@/types/finance";
import {
	Home,
	Receipt,
	Target,
	BarChart3,
	User,
	LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function MobileNav({
	currentPage,
	setCurrentPage,
}: MobileNavProps) {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";

	const NavButton = ({
		icon: Icon,
		label,
		page,
	}: {
		icon: LucideIcon;
		label: string;
		page: string;
	}) => (
		<button
			onClick={() => setCurrentPage(page)}
			className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
				currentPage === page
					? "bg-emerald-500 text-white"
					: `${textSecondary} hover:bg-gray-200 dark:hover:bg-slate-700`
			}`}>
			<Icon size={20} />
			<span className="text-xs font-medium">{label}</span>
		</button>
	);

	return (
		<nav
			className={`md:hidden fixed bottom-0 left-0 right-0 ${cardBg} border-t ${borderColor} shadow-lg`}>
			<div className="flex justify-around p-2">
				<NavButton icon={Home} label="Home" page="dashboard" />
				<NavButton icon={Receipt} label="Expenses" page="expenses" />
				<NavButton icon={Target} label="Budget" page="budgets" />
				<NavButton icon={BarChart3} label="Stats" page="insights" />
				<NavButton icon={User} label="Profile" page="profile" />
			</div>
		</nav>
	);
}
