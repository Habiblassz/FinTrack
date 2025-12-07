"use client";

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
	title: string;
	message: string;
	icon: LucideIcon;
	action?: React.ReactNode;
}

export default function EmptyState({
	title,
	message,
	icon: Icon,
	action,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 h-full min-h-[250px] animate-in fade-in duration-500">
			<div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full mb-4">
				<Icon className="text-emerald-600 dark:text-emerald-400" size={32} />
			</div>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
				{title}
			</h3>
			<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
				{message}
			</p>
			{action}
		</div>
	);
}
