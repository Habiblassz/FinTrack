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

export default function MobileNav() {
	const pathname = usePathname();

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
			className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
				isActive(href)
					? "bg-emerald-500 text-white"
					: "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
			}`}>
			<Icon size={20} />
			<span className="text-xs font-medium">{label}</span>
		</Link>
	);

	return (
		<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 shadow-lg z-50">
			<div className="flex justify-around p-2">
				<NavButton icon={Home} label="Home" href="/dashboard" />
				<NavButton icon={Receipt} label="Expenses" href="/expenses" />
				<NavButton icon={Target} label="Budget" href="/budgets" />
				<NavButton icon={BarChart3} label="Stats" href="/insights" />
				<NavButton icon={User} label="Profile" href="/profile" />
			</div>
		</nav>
	);
}
