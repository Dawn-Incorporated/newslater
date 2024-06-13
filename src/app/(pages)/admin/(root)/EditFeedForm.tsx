"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useState } from "react";
import { editFeed } from "@/server/db/action/feedsActions";

const formSchema = z.object({
	url: z.string().min(1, "This field is required.").url().max(255),
	name: z.string().min(1, "This field is required.").max(255),
	description: z.string().max(255),
	category: z.string().min(1, "This field is required.").max(255),
	website: z.string().max(255)
})

const categories = [
	{label: "Technology", value: "technology"},
	{label: "Science", value: "science"},
	{label: "Business", value: "business"},
	{label: "Health", value: "health"},
	{label: "Sports", value: "sports"},
	{label: "Entertainment", value: "entertainment"},
	{label: "General", value: "general"}
]

export default function EditFeedForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: "",
			name: "",
			description: "",
			category: "",
			website: ""
		}
	})

	const [open, setOpen] = useState<boolean>(false)

	function onSubmit(values: z.infer<typeof formSchema>) {
		const attempt = editFeed(values)

		toast.promise(attempt, {
			loading: "Creating feed...",
			success: "Feed created successfully.",
			error: (error) => {
				return `Failed to create feed. Reason: ${ error }` ?? "Unknown error."
			}
		})

	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm"
						className={ "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 bg-white text-black shadow-none hover:bg-transparent bg-transparent p-0 font-normal" }>
					Edit feed
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit feed</DialogTitle>
				</DialogHeader>
				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
						<FormField
							control={ form.control }
							name="url"
							render={ ({field}) => (
								<FormItem>
									<FormLabel>RSS URL</FormLabel>
									<FormControl>
										<Input placeholder="https://9to5mac.com/rss" { ...field } />
									</FormControl>
									<FormDescription>
										This is the RSS feed URL.
									</FormDescription>
									<FormMessage/>
								</FormItem>
							) }
						/>
						<FormField
							control={ form.control }
							name="name"
							render={ ({field}) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="9to5mac" { ...field } />
									</FormControl>
									<FormDescription>
										This is the feed&apos;s name — usually its Website name.
									</FormDescription>
									<FormMessage/>
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="category"
							render={ ({field}) => (
								<FormItem className="flex flex-col">
									<FormLabel>Category</FormLabel>
									<Popover open={ open } onOpenChange={ setOpen }>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={ cn(
														"justify-between",
														!field.value && "text-muted-foreground"
													) }
												>
													{ field.value
														? categories.find(
															(category) => category.value === field.value
														)?.label
														: "Select category" }
													<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="p-0">
											<Command>
												<CommandInput
													placeholder="Search categories..."
													className="h-9"
												/>
												<CommandEmpty>No category found.</CommandEmpty>
												<CommandGroup>
													{ categories.map((category) => (
														<CommandItem
															value={ category.label }
															key={ category.value }
															onSelect={ () => {
																form.setValue("category", category.value)
																setOpen(false)
															} }
														>
															{ category.label }
															<CheckIcon
																className={ cn(
																	"ml-auto h-4 w-4",
																	category.value === field.value
																		? "opacity-100"
																		: "opacity-0"
																) }
															/>
														</CommandItem>
													)) }
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage/>
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="description"
							render={ ({field}) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="Apple news" { ...field } />
									</FormControl>
									<FormMessage/>
								</FormItem>
							) }
						/>
						<FormField
							control={ form.control }
							name="website"
							render={ ({field}) => (
								<FormItem>
									<FormLabel>Homepage</FormLabel>
									<FormControl>
										<Input placeholder="https://9to5mac.com" { ...field } />
									</FormControl>
									<FormMessage/>
								</FormItem>
							) }
						/>
						<Button type="submit" className="!mt-4">Submit</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}