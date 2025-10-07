"use client";

import { SidebarProps } from "@/types/finance";
import {
	Home,
	Receipt,
	Target,
	BarChart3,
	User,
	LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

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
			className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
				currentPage === page
					? "bg-emerald-500 text-white"
					: `${textSecondary} hover:bg-gray-200 dark:hover:bg-slate-700`
			}`}>
			<Icon size={20} />
			<span className="font-medium">{label}</span>
		</button>
	);

	return (
		<aside
			className={`hidden md:block w-64 ${cardBg} rounded-2xl p-4 shadow-md border ${borderColor}`}>
			<nav className="space-y-2">
				<NavButton icon={Home} label="Dashboard" page="dashboard" />
				<NavButton icon={Receipt} label="Expenses" page="expenses" />
				<NavButton icon={Target} label="Budgets" page="budgets" />
				<NavButton icon={BarChart3} label="Insights" page="insights" />
				<NavButton icon={User} label="Profile" page="profile" />
			</nav>
		</aside>
	);
}
