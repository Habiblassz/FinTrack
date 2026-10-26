# FinTrack

FinTrack is a modern personal finance tracking application designed to help users manage their budgets, track daily expenses, and gain actionable insights into their financial health.

## Architecture

This project is built with a modern React stack, prioritizing clear separation of concerns:

- **Framework:** Next.js with the App Router (`/app` directory).
- **Styling:** Tailwind CSS for responsive, utility-first UI components.
- **State Management:** `FinanceContext` (`context/FinanceContext.tsx`) provides global state for user financial data across the application.
- **Data Fetching & Mutations:** The `hooks/useFinance.ts` hook acts as the primary boundary between the UI and our Firebase Firestore database.
- **Business Logic:** Pure calculation utilities for trends, category breakdowns, and savings rates are isolated in `lib/calculations.ts` for easy testing.
- **Backend/Auth:** Firebase Auth for user management and Firestore for real-time document storage.

## Getting Started

### 1. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install