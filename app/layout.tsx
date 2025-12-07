import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FinanceProvider } from "@/context/FinanceContext";
import { ThemeProvider } from "@/components/themeProvider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "FinTrack - Personal Finance Dashboard",
	description: "Manage your personal finances with ease",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 selection:bg-emerald-500/30`}>
				<FinanceProvider>
					<ThemeProvider>
						<div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
							<Header />
							<div className="flex gap-6">
								<Sidebar />
								<main className="flex-1 min-w-0">{children}</main>
							</div>
							<MobileNav />
						</div>
					</ThemeProvider>
				</FinanceProvider>
			</body>
		</html>
	);
}
