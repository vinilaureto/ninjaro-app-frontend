import Dashboard from "@/components/dashboard/dashboard";
import LinkForm from "@/components/links/links-form";
import { Skeleton } from "@/components/ui/skeleton";
import { createLink, getLinkById, updateLink } from "@/services/links";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function LinkPage() {
	const [link, setLink] = useState<Link | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if ("id" in params) {
			getLinkById(params.id!).then((response) => {
				if (response.success) {
					setLink(response.link);
					setLoading(false);
				}
			});
		} else {
			setLoading(false);
		}
	}, [params]);

	async function handleLinkCreateOrUpdate(link: Link | Omit<Link, "id">) {
		const response =
			"id" in link ? await updateLink(link) : await createLink(link);
		if (response.success) {
			toast.success("Link salvo com sucesso");
			navigate("/links");
		}
	}

	return (
		<Dashboard
			breadcrumb={[{ label: "Links", link: "/links" }, { label: "Novo link" }]}
		>
			<h1 className="text-xl font-bold mb-4">Criando um novo link</h1>
			{loading ? (
				<Skeleton className="h-[40px]" />
			) : (
				<LinkForm onSubmit={handleLinkCreateOrUpdate} initialData={link} />
			)}
		</Dashboard>
	);
}
