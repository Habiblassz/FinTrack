"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useFinance } from "@/hooks/useFinance";
import { FinanceContextType } from "@/types/finance";

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
	const finance = useFinance();

	return (
		<FinanceContext.Provider value={finance}>
			{children}
		</FinanceContext.Provider>
	);
}

export function useFinanceContext() {
	const context = useContext(FinanceContext);
	if (context === undefined) {
		throw new Error("useFinanceContext must be used within a FinanceProvider");
	}
	return context;
}
