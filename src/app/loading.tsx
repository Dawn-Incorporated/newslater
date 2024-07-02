import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl font-semibold text-center">Newslater.</h1>
			<h3 className="text-lg font-medium text-center">read the news. one day at a time.</h3>
			<Loader2 className="h-10 w-10 animate-spin text-primary m-6"/>
		</div>

	);
}