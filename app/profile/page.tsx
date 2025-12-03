"use client";

import { useState, useEffect } from "react";
import { useFinanceContext } from "@/context/FinanceContext";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
	const { user } = useFinanceContext();
	const [displayName, setDisplayName] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (user?.displayName) {
			setDisplayName(user.displayName);
		}
	}, [user]);

	const handleUpdateProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!auth.currentUser) return;

		setIsSaving(true);
		try {
			await updateProfile(auth.currentUser, {
				displayName: displayName,
			});
			setMessage("Profile updated successfully!");

			setTimeout(() => setMessage(""), 3000);
		} catch (error) {
			console.error(error);
			setMessage("Failed to update profile.");
		} finally {
			setIsSaving(false);
		}
	};

	const inputClass =
		"w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none";
	const labelClass = "text-sm text-gray-600 dark:text-gray-300";

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
				Profile & Settings
			</h1>

			<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					Account Information
				</h2>

				<form onSubmit={handleUpdateProfile} className="space-y-4">
					<div>
						<label className={labelClass}>Full Name</label>
						<input
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							className={inputClass}
							placeholder="Enter your name"
						/>
					</div>

					<div>
						<label className={labelClass}>Email</label>
						<input
							type="email"
							value={user?.email || ""}
							disabled
							className={`${inputClass} opacity-60 cursor-not-allowed`}
						/>
						<p className="text-xs text-gray-400 mt-1">
							Email cannot be changed for Google accounts.
						</p>
					</div>

					<div className="pt-2">
						<button
							type="submit"
							disabled={isSaving}
							className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl transition-colors disabled:opacity-50">
							{isSaving ? "Saving..." : "Update Profile"}
						</button>
						{message && (
							<span
								className={`ml-4 text-sm ${
									message.includes("Failed")
										? "text-red-500"
										: "text-emerald-500"
								}`}>
								{message}
							</span>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
