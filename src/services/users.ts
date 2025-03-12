type CreateUserPayload = {
	name: string;
	email: string;
	password: string;
};

type CreateUserResponse = { success: boolean };

export async function createUser(
	payload: CreateUserPayload
): Promise<CreateUserResponse> {
	try {
		const response = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/app/v1/users",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: payload.name,
					email: payload.email,
					password: payload.password,
				}),
			}
		);

		if (!response.ok) {
			console.error("Failed to create new user.");
			return { success: false };
		}

		const data = (await response.json()) as { success: boolean };

		return data;
	} catch (error) {
		console.error("Failed to create new user", error);
		return { success: false };
	}
}

type AuthUserPayload = { email: string; password: string };

type AuthUserResponse = { success: boolean };

export async function authUser(
	payload: AuthUserPayload
): Promise<AuthUserResponse> {
	try {
		const reponse = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/app/v1/users/auth",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
				}),
			}
		);

		if (!reponse.ok) {
			console.error("Failed to auth user");
			return { success: false };
		}

		return { success: true };
	} catch (error) {
		console.error("Failed to auth user", error);
		return { success: false };
	}
}
