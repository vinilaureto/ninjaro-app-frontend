import Dashboard from "@/components/dashboard/dashboard";
import { columns } from "@/components/links/columns";
import { DataTable } from "@/components/links/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllLinks } from "@/services/links";
import { useEffect, useState } from "react";

export default function LinksPage() {
	const [links, setLinks] = useState<Link[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAllLinks().then((response) => {
			if (!response.success) return;

			setLinks(response.links);
			setIsLoading(false);
		});
	}, []);

	return (
		<Dashboard breadcrumb={[{ label: "Links" }]}>
			<div>
				<h1 className="text-xl font-bold">Todos os links criados</h1>
				{isLoading ? (
					<Skeleton className="h-[40px]" />
				) : (
					<DataTable columns={columns} data={links} />
				)}
			</div>
		</Dashboard>
	);
}
