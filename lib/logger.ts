type LogContext = Record<string, unknown>;

class Logger {
	private formatMessage(level: string, message: string, context?: LogContext) {
		return JSON.stringify({
			timestamp: new Date().toISOString(),
			level,
			message,
			...context,
		});
	}

	info(message: string, context?: LogContext) {
		console.info(this.formatMessage("info", message, context));
	}

	warn(message: string, context?: LogContext) {
		console.warn(this.formatMessage("warn", message, context));
	}

	error(message: string, context?: LogContext) {
		console.error(this.formatMessage("error", message, context));

		// Future hook: if (process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true') { Sentry.captureException(...) }
	}
}

export const logger = new Logger();
