type CreateLinkResponse = { success: true } | { success: false };

export async function createLink(
	link: Omit<Link, "id">
): Promise<CreateLinkResponse> {
	try {
		const response = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/api/v1/links",
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(link),
			}
		);

		if (!response.ok) {
			console.error("Failed to create new link.");
			return { success: false };
		}

		const data = (await response.json()) as {
			success: boolean;
		};

		return data;
	} catch (error) {
		console.error("Failed to create new link", error);
		return { success: false };
	}
}

type UpdateLinkReponse = { success: true } | { success: false };

export async function updateLink(link: Link): Promise<UpdateLinkReponse> {
	try {
		const response = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/api/v1/links/" + link.id,
			{
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(link),
			}
		);

		if (!response.ok) {
			console.error("Failed to update link.");
			return { success: false };
		}

		const data = (await response.json()) as {
			success: boolean;
		};

		return data;
	} catch (error) {
		console.error("Failed to update link", error);
		return { success: false };
	}
}

type GetAllLinksResponse =
	| { links: Link[]; success: true }
	| { success: false; links: [] };

export async function getAllLinks(): Promise<GetAllLinksResponse> {
	try {
		const response = await fetch(
			import.meta.env.VITE_API_BASE_URL + "/api/v1/links",
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			console.error("Failed to fetch links.");
			return { success: false, links: [] };
		}

		const data = (await response.json()) as { links: Link[]; success: boolean };

		return { success: true, links: data.links };
	} catch (error) {
		console.error("Failed to fetch links", error);
		return { success: false, links: [] };
	}
}

type GetLinkByIdResponse = { link: Link; success: true } | { success: false };

export async function getLinkById(id: string): Promise<GetLinkByIdResponse> {
	try {
		const response = await fetch(
			import.meta.env.VITE_API_BASE_URL + `/api/v1/links/${id}`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			console.error("Failed to fetch link by id.");
			return { success: false };
		}

		const data = (await response.json()) as { link: Link; success: boolean };

		return { success: true, link: data.link };
	} catch (error) {
		console.error("Failed to fetch link by id", error);
		return { success: false };
	}
}
