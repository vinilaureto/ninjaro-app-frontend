type LinkParameter = {
	id: string;
	key: string;
	value: string;
};

type Link = {
	id: string;
	title: string;
	path: string;
	destination: string;
	isActive: boolean;
	parameters: LinkParameter[];
	seo: {
		title: string;
		description: string;
		og: string;
	};
};
