import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FinanceProvider } from "@/context/FinanceContext";
import { ThemeProvider } from "@/components/themeProvider";

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
			<body className={inter.className}>
				<FinanceProvider>
					<ThemeProvider>{children}</ThemeProvider>
				</FinanceProvider>
			</body>
		</html>
	);
}
