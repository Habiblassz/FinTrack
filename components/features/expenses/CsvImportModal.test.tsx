import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CsvImportModal from "./CsvImportModal";
import Papa from "papaparse";

// Mock papaparse
vi.mock("papaparse", () => ({
	default: {
		parse: vi.fn(),
	},
}));

// Mock react-dropzone to easily simulate file drops
vi.mock("react-dropzone", () => ({
	useDropzone: ({ onDrop }: { onDrop: (files: File[]) => void }) => ({
		getRootProps: () => ({
			onClick: () =>
				onDrop([new File(["dummy"], "test.csv", { type: "text/csv" })]),
		}),
		getInputProps: () => ({ type: "file" }),
		isDragActive: false,
	}),
}));

describe("CsvImportModal", () => {
	const mockOnImport = vi.fn();
	const mockOnClose = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("filters rows missing Amount or Name and calls onImport with valid data", async () => {
		render(
			<CsvImportModal
				isOpen={true}
				onClose={mockOnClose}
				onImport={mockOnImport}
			/>,
		);

		// Mock Papa.parse to immediately call 'complete' with our mock data
		(Papa.parse as unknown as ReturnType<typeof vi.fn>).mockImplementation(
			(_file: unknown, config: { complete: (res: unknown) => void }) => {
				config.complete({
					data: [
						{
							Name: "Valid Expense",
							Amount: "50",
							Category: "Food",
							Date: "2023-10-10",
						},
						{ Name: "", Amount: "20", Category: "Rent", Date: "2023-10-11" }, // Invalid (no name)
						{
							Name: "Free Item",
							Amount: "0",
							Category: "Other",
							Date: "2023-10-12",
						}, // Invalid (zero amount)
					],
				});
			},
		);

		// Click the dropzone area (our mock triggers onDrop)
		fireEvent.click(screen.getByText(/drag & drop your csv here/i));

		// The file is now registered, so the Import Data button will be enabled
		const importButton = await screen.findByText(/import data/i);
		fireEvent.click(importButton);

		await waitFor(() => {
			expect(mockOnImport).toHaveBeenCalledWith([
				expect.objectContaining({
					name: "Valid Expense",
					amount: 50,
				}),
			]);
			// Ensure the other two invalid rows were filtered out
			expect(mockOnImport.mock.calls[0][0]).toHaveLength(1);
		});
	});
});
