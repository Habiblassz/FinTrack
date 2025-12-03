"use client";

import { useState } from "react";
import { ExpenseFormProps } from "@/types/finance";

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
	onSubmit,
	onCancel,
}) => {
	const [formData, setFormData] = useState({
		name: "",
		amount: "",
		category: "Food",
		date: new Date().toISOString().split("T")[0],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.name && formData.amount) {
			onSubmit({
				name: formData.name,
				amount: parseFloat(formData.amount),
				category: formData.category,
				date: formData.date,
			});
		}
	};

	const inputClass =
		"w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white";
	const labelClass = "text-sm text-gray-900 dark:text-white mb-1 block";

	return (
		<div className="rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				Add New Expense
			</h3>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className={labelClass}>Expense Name</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className={inputClass}
							placeholder="Enter expense name"
							required
						/>
					</div>
					<div>
						<label className={labelClass}>Amount</label>
						<input
							type="number"
							step="0.01"
							value={formData.amount}
							onChange={(e) =>
								setFormData({ ...formData, amount: e.target.value })
							}
							className={inputClass}
							placeholder="0.00"
							required
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<button
						type="submit"
						className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl transition-colors">
						Save Expense
					</button>
					<button
						type="button"
						onClick={onCancel}
						className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl transition-colors">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
