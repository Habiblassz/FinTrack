"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Home,
	Receipt,
	Target,
	BarChart3,
	User,
	LucideIcon,
} from "lucide-react";

export default function Sidebar() {
	const pathname = usePathname();

	// Helper to determine if link is active
	const isActive = (path: string) => pathname === path;

	const NavButton = ({
		icon: Icon,
		label,
		href,
	}: {
		icon: LucideIcon;
		label: string;
		href: string;
	}) => (
		<Link
			href={href}
			className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
				isActive(href)
					? "bg-emerald-500 text-white"
					: "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
			}`}>
			<Icon size={20} />
			<span className="font-medium">{label}</span>
		</Link>
	);

	return (
		<aside className="hidden md:block w-64 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-slate-700">
			<nav className="space-y-2">
				<NavButton icon={Home} label="Dashboard" href="/dashboard" />
				<NavButton icon={Receipt} label="Expenses" href="/expenses" />
				<NavButton icon={Target} label="Budgets" href="/budgets" />
				<NavButton icon={BarChart3} label="Insights" href="/insights" />
				<NavButton icon={User} label="Profile" href="/profile" />
			</nav>
		</aside>
	);
}
