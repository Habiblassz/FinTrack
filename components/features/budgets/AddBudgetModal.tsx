"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface AddBudgetModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (category: string, amount: number) => void;
}

export default function AddBudgetModal({
	isOpen,
	onClose,
	onSave,
}: AddBudgetModalProps) {
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState("");

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (category && amount) {
			onSave(category, parseFloat(amount));
			setCategory("");
			setAmount("");
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">
						New Budget Category
					</h2>
					<button onClick={onClose}>
						<X size={24} className="text-gray-500" />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Category Name
						</label>
						<input
							type="text"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
							placeholder="e.g., Gym, Pets, Hobbies"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Monthly Limit
						</label>
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
							placeholder="0.00"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-emerald-500 text-white py-2 rounded-xl font-medium hover:bg-emerald-600">
						Create Budget
					</button>
				</form>
			</div>
		</div>
	);
}
