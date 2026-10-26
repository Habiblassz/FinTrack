import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
	calculateTrendData,
	calculateCategorySpending,
	calculateSavingsRate,
	getBudgetStatus,
} from "./calculations";

describe("Calculations Utilities", () => {
	describe("calculateSavingsRate", () => {
		it("calculates the correct savings rate percentage", () => {
			expect(calculateSavingsRate(5000, 2500)).toBe(50);
			expect(calculateSavingsRate(5000, 4000)).toBe(20);
		});

		it("returns 0 if income is 0 or negative", () => {
			expect(calculateSavingsRate(0, 1000)).toBe(0);
		});
	});

	describe("getBudgetStatus", () => {
		it("returns correct status when under budget", () => {
			const status = getBudgetStatus(400, 500);
			expect(status.percentage).toBe(80);
			expect(status.isOverBudget).toBe(false);
			expect(status.remaining).toBe(100);
		});

		it("returns correct status when over budget", () => {
			const status = getBudgetStatus(600, 500);
			expect(status.percentage).toBe(120);
			expect(status.isOverBudget).toBe(true);
			expect(status.remaining).toBe(-100);
		});
	});

	describe("calculateTrendData", () => {
		it("aggregates expenses by month and formats output", () => {
			const expenses = [
				{
					id: "1",
					name: "Groceries",
					amount: 1000,
					date: "2023-01-15",
					category: "Food",
				},
				{
					id: "2",
					name: "Jan Rent",
					amount: 500,
					date: "2023-01-20",
					category: "Rent",
				},
				{
					id: "3",
					name: "Feb Rent",
					amount: 2000,
					date: "2023-02-10",
					category: "Rent",
				},
			];

			const result = calculateTrendData(expenses, 5000);

			expect(result).toHaveLength(2);
			expect(result[0]).toMatchObject({
				month: "Jan 2023",
				income: 5000,
				expenses: 1500,
				savings: 3500,
			});
			expect(result[1]).toMatchObject({
				month: "Feb 2023",
				income: 5000,
				expenses: 2000,
				savings: 3000,
			});
		});
	});

	describe("calculateCategorySpending", () => {
		beforeEach(() => {
			// Lock system time to May 2023 so getCurrentMonthISO() returns '2023-05'
			vi.useFakeTimers();
			vi.setSystemTime(new Date("2023-05-15T12:00:00Z"));
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("calculates totals and percentages for the current month only", () => {
			const expenses = [
				{
					id: "1",
					name: "Lunch",
					amount: 200,
					date: "2023-05-01",
					category: "Food",
				},
				{
					id: "2",
					name: "Dinner",
					amount: 300,
					date: "2023-05-10",
					category: "Food",
				},
				{
					id: "3",
					name: "Bus",
					amount: 500,
					date: "2023-05-20",
					category: "Transport",
				},
				// This expense is from a previous month and should be ignored
				{
					id: "4",
					name: "Last Rent",
					amount: 1000,
					date: "2023-04-15",
					category: "Rent",
				},
			];

			const result = calculateCategorySpending(expenses);

			expect(result).toHaveLength(2);

			const food = result.find((c) => c.name === "Food");
			expect(food?.value).toBe(500);
			expect(food?.percentage).toBe(50); // 500 out of 1000 total

			const transport = result.find((c) => c.name === "Transport");
			expect(transport?.value).toBe(500);
			expect(transport?.percentage).toBe(50); // 500 out of 1000 total
		});
	});
});
