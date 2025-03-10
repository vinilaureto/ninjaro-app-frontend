import TeamSelection from "@/components/auth/team-selection";

export default function SelectTeamPage() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<TeamSelection />
			</div>
		</div>
	);
}
