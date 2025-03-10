"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

type LinkFormProps = {
	initialData?: Link;
	onSubmit: (link: Link | Omit<Link, "id">) => void;
};

export default function LinkForm({ initialData, onSubmit }: LinkFormProps) {
	const [title, setTitle] = useState(initialData?.title || "");
	const [path, setPath] = useState(initialData?.path || "");
	const [destination, setDestination] = useState(
		initialData?.destination || ""
	);
	const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
	const [parameters, setParameters] = useState<LinkParameter[]>(
		initialData?.parameters || []
	);
	const [paramKey, setParamKey] = useState("");
	const [paramValue, setParamValue] = useState("");
	const [seo, setSeo] = useState(
		initialData?.seo || {
			title: "",
			description: "",
			og: "",
		}
	);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!title.trim()) newErrors.title = "O título é obrigatório";
		if (!path.trim()) newErrors.path = "O caminho é obrigatório";
		if (!destination.trim()) newErrors.destination = "O destino é obrigatório";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleAddParameter = () => {
		if (!paramKey.trim() || !paramValue.trim()) return;

		const newParam = {
			id: Date.now().toString(),
			key: paramKey.trim(),
			value: paramValue.trim(),
		};

		setParameters([...parameters, newParam]);
		setParamKey("");
		setParamValue("");
	};

	const handleRemoveParameter = (id: string) => {
		setParameters(parameters.filter((param) => param.id !== id));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		const linkData = {
			...initialData,
			title,
			path,
			destination,
			isActive,
			parameters,
			seo,
		};

		onSubmit(linkData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-4 w-full">
				<div className="space-y-2">
					<Label htmlFor="title">Título</Label>
					<Input
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Ex: Link para documentação"
						className={errors.title ? "border-destructive" : ""}
					/>
					{errors.title && (
						<p className="text-sm text-destructive">{errors.title}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="path">Caminho</Label>
					<Input
						id="path"
						value={path}
						onChange={(e) => setPath(e.target.value)}
						placeholder="Ex: /docs"
						className={errors.path ? "border-destructive" : ""}
					/>
					{errors.path && (
						<p className="text-sm text-destructive">{errors.path}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="destination">Destino</Label>
					<Input
						id="destination"
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
						placeholder="Ex: https://example.com/documentation"
						className={errors.destination ? "border-destructive" : ""}
					/>
					{errors.destination && (
						<p className="text-sm text-destructive">{errors.destination}</p>
					)}
				</div>

				<div className="flex items-center space-x-2">
					<Switch
						id="isActive"
						checked={isActive}
						onCheckedChange={setIsActive}
					/>
					<Label htmlFor="isActive">Ativo</Label>
				</div>

				<div className="space-y-4">
					<Label>Parâmetros</Label>

					<div className="flex gap-2">
						<Input
							value={paramKey}
							onChange={(e) => setParamKey(e.target.value)}
							placeholder="Chave"
							className="flex-1"
						/>
						<Input
							value={paramValue}
							onChange={(e) => setParamValue(e.target.value)}
							placeholder="Valor"
							className="flex-1"
						/>
						<Button
							type="button"
							variant="outline"
							onClick={handleAddParameter}
							disabled={!paramKey.trim() || !paramValue.trim()}
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>

					{parameters.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-2">
							{parameters.map((param) => (
								<Badge
									key={param.id}
									variant="secondary"
									className="flex items-center gap-1"
								>
									{param.key}={param.value}
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="h-4 w-4 p-0 ml-1"
										onClick={() => handleRemoveParameter(param.id)}
									>
										<X className="h-3 w-3" />
										<span className="sr-only">Remover parâmetro</span>
									</Button>
								</Badge>
							))}
						</div>
					)}
				</div>
			</div>

			<Separator className="mt-8 mb-8" />

			<div className="space-y-4 grid grid-cols-12 gap-8">
				<div className="space-y-4 col-span-7">
					<div className="space-y-2">
						<Label htmlFor="metaTitle">Meta Título</Label>
						<Input
							id="metaTitle"
							value={seo.title}
							onChange={(e) => setSeo({ ...seo, title: e.target.value })}
							placeholder="Título para SEO"
						/>
						<p className="text-xs text-muted-foreground">
							Recomendado: até 60 caracteres. Deixe em branco para usar o título
							principal.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="metaDescription">Meta Descrição</Label>
						<Textarea
							id="metaDescription"
							value={seo.description}
							onChange={(e) => setSeo({ ...seo, description: e.target.value })}
							placeholder="Breve descrição para resultados de busca e compartilhamentos"
							rows={3}
						/>
						<p className="text-xs text-muted-foreground">
							Recomendado: entre 120-160 caracteres para melhor exibição nos
							resultados de busca.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="ogImage">Imagem Open Graph</Label>
						<Input
							id="ogImage"
							value={seo.og}
							onChange={(e) => setSeo({ ...seo, og: e.target.value })}
							placeholder="URL da imagem (ex: https://example.com/image.jpg)"
						/>
						<p className="text-xs text-muted-foreground">
							Recomendado: 1200 x 630 pixels para melhor exibição em redes
							sociais.
						</p>
					</div>
				</div>

				<div className="col-span-5 flex justify-center">
					<div className="max-w-lg border rounded-lg overflow-hidden w-full">
						{seo.og !== "" ? (
							<div className="relative w-full h-[200px]">
								<img
									src={seo.og || "/placeholder.svg"}
									alt={seo.title}
									className="w-full h-full object-cover"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"/placeholder.svg?height=200&width=400";
									}}
								/>
							</div>
						) : (
							<div className="bg-gray-200 w-full h-[200px] flex items-center justify-center text-gray-500">
								Sem imagem
							</div>
						)}
						<div className="p-4 bg-white">
							<div className="text-xs text-gray-500 mb-1">{seo.title}</div>
							<h3 className="font-bold text-gray-900 mb-1 truncate">
								{seo.title === "" ? "Título da Página" : seo.title}
							</h3>
							<p className="text-sm text-gray-700 line-clamp-2">
								{seo.description === ""
									? "Breve descrição para resultados de busca e compartilhamentos"
									: seo.description}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-2 pt-2">
				<NavLink to="/links">
					<Button type="button" variant="outline">
						Cancelar
					</Button>
				</NavLink>

				<Button type="submit">
					{initialData ? "Atualizar Link" : "Criar Link"}
				</Button>
			</div>
		</form>
	);
}
