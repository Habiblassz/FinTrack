"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import DashboardPage from "@/app/dashboard/page";
import ExpensesPage from "@/app/expenses/page";
import BudgetsPage from "@/app/budgets/page";
import InsightsPage from "@/app/insights/page";
import ProfilePage from "@/app/profile/page";
import { useTheme } from "next-themes";

function AppContent() {
	const [currentPage, setCurrentPage] = useState("dashboard");
	const { theme } = useTheme();

	const renderPage = () => {
		switch (currentPage) {
			case "dashboard":
				return <DashboardPage />;
			case "expenses":
				return <ExpensesPage />;
			case "budgets":
				return <BudgetsPage />;
			case "insights":
				return <InsightsPage />;
			case "profile":
				return <ProfilePage />;
			default:
				return <DashboardPage />;
		}
	};

	const bgClass = theme === "dark" ? "bg-slate-900" : "bg-gray-50";

	return (
		<div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
			<div className="max-w-7xl mx-auto px-4 py-6">
				<Header />
				<div className="flex gap-6">
					<Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
					<main className="flex-1">{renderPage()}</main>
				</div>
				<MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
			</div>
		</div>
	);
}

export default function Home() {
	return <AppContent />;
}
