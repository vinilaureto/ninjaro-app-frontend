import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

type DashboardProps = {
	breadcrumb?: {
		label: string;
		link?: string;
	}[];
	children: React.ReactNode;
};

export default function Dashboard(props: DashboardProps) {
	const { breadcrumb, children } = props;

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumb?.map((item, index) => (
									<div key={index} className="flex items-center gap-2">
										<BreadcrumbItem>
											{index != breadcrumb.length - 1 ? (
												<BreadcrumbLink asChild>
													<NavLink to={item.link!}>{item.label}</NavLink>
												</BreadcrumbLink>
											) : (
												<BreadcrumbPage>{item.label}</BreadcrumbPage>
											)}
										</BreadcrumbItem>
										{index < breadcrumb.length - 1 && (
											<BreadcrumbSeparator className="hidden md:block" />
										)}
									</div>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-col gap-4 p-4 pt-0 items-center">
					<div className="min-h-[100vh] rounded-xl md:min-h-min w-8/10">
						{children}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
