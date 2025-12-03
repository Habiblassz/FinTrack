"use client";

export default function ProfilePage() {
	const inputClass =
		"w-full mt-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white";
	const labelClass = "text-sm text-gray-600 dark:text-gray-300";

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
				Profile & Settings
			</h1>

			<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700">
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					Account Information
				</h2>
				<div className="space-y-4">
					<div>
						<label className={labelClass}>Full Name</label>
						<input type="text" defaultValue="John Doe" className={inputClass} />
					</div>
					<div>
						<label className={labelClass}>Email</label>
						<input
							type="email"
							defaultValue="johndoe@email.com"
							className={inputClass}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
