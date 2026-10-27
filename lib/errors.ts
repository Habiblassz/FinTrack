export type ErrorCode =
	| "VALIDATION_FAILED"
	| "AUTH_REQUIRED"
	| "NETWORK_ERROR"
	| "UNKNOWN_ERROR";

export class AppError extends Error {
	constructor(
		public code: ErrorCode,
		message: string,
	) {
		super(message);
		this.name = "AppError";
	}
}
