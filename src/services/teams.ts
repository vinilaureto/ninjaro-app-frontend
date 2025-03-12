type GetTeamsResponse =
	| { success: true; teams: { id: string; name: string }[] }
	| { success: false };

export async function getTeams(): Promise<GetTeamsResponse> {
	try {
		const response = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/app/v1/teams",
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			console.error("Failed to fetch teams.");
			return { success: false };
		}

		const data = (await response.json()) as {
			success: boolean;
			teams: { id: string; name: string }[];
		};

		return data;
	} catch (error) {
		console.error("Failed to fetch teams", error);
		return { success: false };
	}
}

type CreateTeamResponse =
	| { success: true; team: { id: string; name: string } }
	| { success: false };

export async function createTeam(name: string): Promise<CreateTeamResponse> {
	try {
		const response = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/app/v1/teams",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			}
		);

		if (!response.ok) {
			console.error("Failed to create new team.");
			return { success: false };
		}

		const data = (await response.json()) as {
			success: boolean;
			team: { id: string; name: string };
		};

		return data;
	} catch (error) {
		console.error("Failed to create new team", error);
		return { success: false };
	}
}

type AuthTeamResponse = { success: true } | { success: false };

export async function authTeam(teamID: string): Promise<AuthTeamResponse> {
	try {
		const reponse = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/app/v1/teams/auth",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ teamID }),
			}
		);

		if (!reponse.ok) {
			console.error("Failed to select team");
			return { success: false };
		}

		return { success: true };
	} catch (error) {
		console.error("Failed to select team", error);
		return { success: false };
	}
}
