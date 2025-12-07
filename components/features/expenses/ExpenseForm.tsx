"use client";

import { useState, useEffect } from "react";
import { ExpenseFormProps } from "@/types/finance";
import { useFinanceContext } from "@/context/FinanceContext";

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
	initialData,
	onSubmit,
	onCancel,
}) => {
	const { financialData } = useFinanceContext();

	const availableCategories =
		financialData.budgets.length > 0
			? financialData.budgets.map((b) => b.category)
			: ["Uncategorized"];

	const INITIAL_STATE = {
		name: "",
		amount: "",
		category: availableCategories[0],
		date: new Date().toISOString().split("T")[0],
	};

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState<{
		name?: string;
		amount?: string;
		date?: string;
	}>({});

	useEffect(() => {
		if (initialData) {
			setFormData({
				name: initialData.name,
				amount: initialData.amount.toString(),
				category: initialData.category,
				date: initialData.date,
			});
		} else {
			setFormData(INITIAL_STATE);
		}
	}, [initialData]);

	const validate = () => {
		const newErrors: any = {};
		if (!formData.name.trim()) newErrors.name = "Expense name is required";
		if (!formData.amount || parseFloat(formData.amount) <= 0)
			newErrors.amount = "Amount must be greater than 0";
		if (!formData.date) newErrors.date = "Date is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		onSubmit({
			name: formData.name,
			amount: parseFloat(formData.amount),
			category: formData.category,
			date: formData.date,
		});

		if (!initialData) {
			setFormData({
				...INITIAL_STATE,
				date: new Date().toISOString().split("T")[0],
			});
		}
	};

	const inputClass =
		"w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all";
	const labelClass =
		"text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block";
	const errorClass = "text-red-500 text-xs mt-1";

	return (
		<div className="rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in slide-in-from-top-4 duration-300">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				{initialData ? "Edit Expense" : "Add New Expense"}
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
							className={`${inputClass} ${
								errors.name ? "border-red-500 focus:ring-red-500" : ""
							}`}
							placeholder="e.g. Groceries"
							autoFocus={!initialData}
						/>
						{errors.name && <p className={errorClass}>{errors.name}</p>}
					</div>
					<div>
						<label className={labelClass}>Amount</label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
								$
							</span>
							<input
								type="number"
								step="0.01"
								value={formData.amount}
								onChange={(e) =>
									setFormData({ ...formData, amount: e.target.value })
								}
								className={`${inputClass} pl-8 ${
									errors.amount ? "border-red-500 focus:ring-red-500" : ""
								}`}
								placeholder="0.00"
							/>
						</div>
						{errors.amount && <p className={errorClass}>{errors.amount}</p>}
					</div>
					<div>
						<label className={labelClass}>Category</label>
						<select
							value={formData.category}
							onChange={(e) =>
								setFormData({ ...formData, category: e.target.value })
							}
							className={inputClass}>
							{availableCategories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className={labelClass}>Date</label>
						<input
							type="date"
							value={formData.date}
							onChange={(e) =>
								setFormData({ ...formData, date: e.target.value })
							}
							className={`${inputClass} ${
								errors.date ? "border-red-500 focus:ring-red-500" : ""
							}`}
						/>
						{errors.date && <p className={errorClass}>{errors.date}</p>}
					</div>
				</div>
				<div className="flex gap-3 pt-2">
					<button
						type="submit"
						className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl transition-colors font-medium shadow-sm hover:shadow-emerald-500/25">
						{initialData ? "Update Expense" : "Save Expense"}
					</button>
					<button
						type="button"
						onClick={onCancel}
						className="px-6 py-2.5 rounded-xl transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 font-medium">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
