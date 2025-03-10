import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Plus } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router";
import { useSessionContext } from "@/context/session-context";
import { authTeam, createTeam, getTeams } from "@/services/teams";

export default function TeamSelection() {
	const [selectedTeam, setSelectedTeam] = useState("");
	const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
	const [newTeamName, setNewTeamName] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigation = useNavigate();
	const { updateSession } = useSessionContext();

	useEffect(() => {
		getTeams().then((response) => {
			if (!response.success) return;

			setTeams(response.teams);
			setIsLoading(false);
		});
	}, []);

	async function handleCreateTeam() {
		if (!newTeamName.trim()) return;

		const response = await createTeam(newTeamName.trim());
		if (!response.success) return;

		setTeams((prevTeams) => [
			...prevTeams,
			{ id: response.team.id, name: response.team.name },
		]);
		setNewTeamName("");
		setIsDialogOpen(false);
	}

	async function handleTeamSelection() {
		if (!selectedTeam) return;

		const response = await authTeam(selectedTeam);
		if (!response.success) return;

		await updateSession();
		navigation("/dashboard");
	}

	return (
		<Card className="w-full max-w-md mx-auto flex flex-col justify-center">
			<CardHeader>
				<CardTitle>Selecione ou Crie um Time</CardTitle>
				<CardDescription>
					Escolha um time existente ou crie um novo para continuar.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<RadioGroup
					className="space-y-4"
					value={selectedTeam}
					onValueChange={(teamID: string) => setSelectedTeam(teamID)}
				>
					{isLoading && <Skeleton className="h-[40px]" />}
					{isLoading && <Skeleton className="h-[40px]" />}
					{isLoading && <Skeleton className="h-[40px]" />}

					{!isLoading &&
						teams.map((team) => (
							<div key={team.id} className="flex items-center space-x-2">
								<RadioGroupItem value={team.id} id={`team-${team.id}`} />
								<Label
									htmlFor={`team-${team.id}`}
									className="flex items-center space-x-2 cursor-pointer"
								>
									<Users className="h-4 w-4" />
									<span>{team.name}</span>
								</Label>
							</div>
						))}
				</RadioGroup>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" className="w-full mt-4">
							<Plus className="mr-2 h-4 w-4" /> Criar Novo Time
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Criar Novo Time</DialogTitle>
							<DialogDescription>
								Digite o nome do novo time que você deseja criar.
							</DialogDescription>
						</DialogHeader>
						<Input
							value={newTeamName}
							onChange={(e) => setNewTeamName(e.target.value)}
							placeholder="Nome do Time"
						/>
						<DialogFooter>
							<Button onClick={handleCreateTeam}>Criar Time</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Button className="w-full mt-4" onClick={handleTeamSelection}>
					Continuar
				</Button>
			</CardContent>
		</Card>
	);
}
