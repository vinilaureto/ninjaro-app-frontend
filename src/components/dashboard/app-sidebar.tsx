import { ChartColumnBig, GalleryVerticalEnd, Link } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useSessionContext } from "@/context/session-context";

// This is sample data.
const sampleData = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Links",
			url: "",
			icon: Link,
			isActive: true,
			items: [
				{
					title: "Todos os links",
					url: "/links",
				},
				{
					title: "Novo links",
					url: "/links/new",
				},
			],
		},
		{
			title: "Estatíticas",
			url: "#",
			icon: ChartColumnBig,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { session } = useSessionContext();

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher
					currentTeam={{
						name: session?.team.name || "",
						logo: GalleryVerticalEnd,
						plan: "Enterprise",
					}}
				/>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={sampleData.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						avatar: sampleData.user.avatar,
						email: session?.user.email || "",
						name: session?.user.name || "",
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
