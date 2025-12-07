"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Upload, X, FileText, AlertCircle, Check } from "lucide-react";
import { Expense } from "@/types/finance";

interface CsvImportModalProps {
	isOpen: boolean;
	onClose: () => void;
	onImport: (data: Omit<Expense, "id">[]) => Promise<void>;
}

export default function CsvImportModal({
	isOpen,
	onClose,
	onImport,
}: CsvImportModalProps) {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<any[]>([]);
	const [error, setError] = useState("");
	const [isImporting, setIsImporting] = useState(false);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const selected = acceptedFiles[0];
		if (selected?.type !== "text/csv" && !selected?.name.endsWith(".csv")) {
			setError("Please upload a valid CSV file.");
			return;
		}
		setFile(selected);
		setError("");

		Papa.parse(selected, {
			header: true,
			skipEmptyLines: true,
			preview: 5,
			complete: (results) => {
				setPreview(results.data);
			},
			error: (err) => {
				setError("Failed to parse CSV: " + err.message);
			},
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "text/csv": [".csv"] },
		multiple: false,
	});

	const handleImport = async () => {
		if (!file) return;
		setIsImporting(true);

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: async (results) => {
				try {
					// Map CSV columns to our Expense type
					// This handles common variations like "Description" vs "Name"
					const parsedExpenses = results.data
						.map((row: any) => ({
							name:
								row.Description || row.Name || row.name || "Unknown Expense",
							amount: parseFloat(row.Amount || row.amount || "0"),
							category: row.Category || row.category || "Other",
							date:
								row.Date || row.date || new Date().toISOString().split("T")[0],
						}))
						.filter((e: any) => e.amount > 0 && e.name !== "Unknown Expense");

					if (parsedExpenses.length === 0) {
						setError(
							"No valid expenses found. Check your CSV columns (Name, Amount, Category, Date)."
						);
						setIsImporting(false);
						return;
					}

					await onImport(parsedExpenses);
					onClose();
					setFile(null);
					setPreview([]);
				} catch (err) {
					console.error(err);
					setError("Import failed. Please try again.");
				} finally {
					setIsImporting(false);
				}
			},
		});
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">
						Import Expenses via CSV
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
						<X size={24} />
					</button>
				</div>

				<div className="p-6 space-y-6">
					{/* Dropzone Area */}
					{!file ? (
						<div
							{...getRootProps()}
							className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                        ${
													isDragActive
														? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
														: "border-gray-300 dark:border-slate-600 hover:border-emerald-400 hover:bg-gray-50 dark:hover:bg-slate-700/50"
												}`}>
							<input {...getInputProps()} />
							<div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full mb-4">
								<Upload
									className="text-emerald-600 dark:text-emerald-400"
									size={32}
								/>
							</div>
							<p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
								{isDragActive
									? "Drop the file here"
									: "Drag & drop your CSV here"}
							</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								or click to browse files
							</p>
							<p className="text-xs text-gray-400 mt-4">
								Supported columns: Date, Name, Amount, Category
							</p>
						</div>
					) : (
						<div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4 flex items-center justify-between border border-gray-200 dark:border-slate-600">
							<div className="flex items-center gap-3">
								<div className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 rounded-lg">
									<FileText
										className="text-emerald-600 dark:text-emerald-400"
										size={24}
									/>
								</div>
								<div>
									<p className="font-medium text-gray-900 dark:text-white">
										{file.name}
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{(file.size / 1024).toFixed(1)} KB
									</p>
								</div>
							</div>
							<button
								onClick={() => {
									setFile(null);
									setPreview([]);
									setError("");
								}}
								className="text-gray-400 hover:text-red-500 transition-colors">
								<X size={20} />
							</button>
						</div>
					)}

					{/* Error Message */}
					{error && (
						<div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
							<AlertCircle size={16} />
							{error}
						</div>
					)}

					{/* Preview Table */}
					{preview.length > 0 && (
						<div className="space-y-3">
							<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
								File Preview
							</h4>
							<div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
								<table className="w-full text-sm text-left">
									<thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300">
										<tr>
											{Object.keys(preview[0])
												.slice(0, 4)
												.map((header) => (
													<th key={header} className="px-4 py-2 font-medium">
														{header}
													</th>
												))}
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-100 dark:divide-slate-700">
										{preview.map((row, i) => (
											<tr
												key={i}
												className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
												{Object.values(row)
													.slice(0, 4)
													.map((cell: any, idx) => (
														<td
															key={idx}
															className="px-4 py-2 text-gray-600 dark:text-gray-400">
															{cell}
														</td>
													))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-gray-100 dark:border-slate-700 flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-colors font-medium">
						Cancel
					</button>
					<button
						onClick={handleImport}
						disabled={!file || isImporting}
						className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-colors font-medium shadow-sm">
						{isImporting ? (
							"Processing..."
						) : (
							<>
								{" "}
								<Check size={18} /> Import Data{" "}
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
