"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useFinanceContext } from "@/context/FinanceContext";
import { LogOut } from "lucide-react";
import Image from "next/image";

export default function LoginButton() {
	const { user } = useFinanceContext();

	const handleLogin = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error("Error signing in", error);
		}
	};

	const handleLogout = async () => {
		await signOut(auth);
	};

	if (user) {
		return (
			<div className="flex items-center gap-3">
				<Image
					src={user.photoURL || ""}
					alt="Profile"
					className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700"
					width={300}
					height={300}
				/>
				<button
					onClick={handleLogout}
					className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
					<LogOut size={16} />
					Sign Out
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={handleLogin}
			className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
			Sign in with Google
		</button>
	);
}
