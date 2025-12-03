"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface EditBudgetModalProps {
	isOpen: boolean;
	onClose: () => void;
	category: string;
	currentBudget: number;
	onSave: (amount: number) => void;
}

export default function EditBudgetModal({
	isOpen,
	onClose,
	category,
	currentBudget,
	onSave,
}: EditBudgetModalProps) {
	const [amount, setAmount] = useState(currentBudget.toString());

	useEffect(() => {
		setAmount(currentBudget.toString());
	}, [currentBudget, isOpen]);

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(parseFloat(amount));
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6 animate-in fade-in zoom-in duration-200">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">
						Edit {category} Budget
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
						<X size={24} />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Monthly Limit
						</label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
								$
							</span>
							<input
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
								placeholder="0.00"
								min="0"
								step="50"
								required
							/>
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
							This will update your spending limit for all future months.
						</p>
					</div>

					<div className="flex gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-colors">
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 px-4 py-2 text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors font-medium">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
