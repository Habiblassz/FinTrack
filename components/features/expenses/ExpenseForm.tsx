"use client";

import { useState } from "react";
import { ExpenseFormProps } from "@/types/finance";
import { useTheme } from "next-themes";

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

	const { theme } = useTheme();

	const isDark = theme === "dark";
	const cardBg = isDark ? "bg-slate-800" : "bg-white";
	const textPrimary = isDark ? "text-white" : "text-gray-900";
	const borderColor = isDark ? "border-slate-700" : "border-gray-200";

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

	return (
		<div
			className={`rounded-2xl p-6 shadow-md border ${borderColor} ${cardBg}`}>
			<h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>
				Add New Expense
			</h3>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className={`text-sm ${textPrimary} mb-1 block`}>
							Expense Name
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${cardBg} ${textPrimary}`}
							placeholder="Enter expense name"
							required
						/>
					</div>
					<div>
						<label className={`text-sm ${textPrimary} mb-1 block`}>
							Amount
						</label>
						<input
							type="number"
							step="0.01"
							value={formData.amount}
							onChange={(e) =>
								setFormData({ ...formData, amount: e.target.value })
							}
							className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${cardBg} ${textPrimary}`}
							placeholder="0.00"
							required
						/>
					</div>
					<div>
						<label className={`text-sm ${textPrimary} mb-1 block`}>
							Category
						</label>
						<select
							value={formData.category}
							onChange={(e) =>
								setFormData({ ...formData, category: e.target.value })
							}
							className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${cardBg} ${textPrimary}`}>
							<option value="Food">Food</option>
							<option value="Bills">Bills</option>
							<option value="Transport">Transport</option>
							<option value="Entertainment">Entertainment</option>
						</select>
					</div>
					<div>
						<label className={`text-sm ${textPrimary} mb-1 block`}>Date</label>
						<input
							type="date"
							value={formData.date}
							onChange={(e) =>
								setFormData({ ...formData, date: e.target.value })
							}
							className={`w-full px-4 py-2 rounded-xl border ${borderColor} ${cardBg} ${textPrimary}`}
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
