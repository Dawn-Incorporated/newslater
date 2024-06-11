'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserType } from "@/server/db/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const schemaUserSettings = z.object({
    name: z.string(),
    email: z.string().email()
})

type UserSettingsProps = {
    user: UserType;
    callback: (values: z.infer<typeof schemaUserSettings>) => Promise<void>
}

export default function UserSettings({user, callback}: UserSettingsProps) {

    const form = useForm<z.infer<typeof schemaUserSettings>>({
        resolver: zodResolver(schemaUserSettings),
        defaultValues: {
            name: user.name ?? "",
            email: user.email ?? ""
        }
    })

    function onSubmit(values: z.infer<typeof schemaUserSettings>) {
        toast.promise(callback(values), {
            loading: "Saving...",
            success: "Saved!",
            error: "An error occurred."
        });
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>

                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form { ...form }>
                        <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8">
                            <FormField
                                control={ form.control }
                                name="name"
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jane Appleseed" { ...field } />
                                        </FormControl>
                                        <FormDescription>
                                            This name will be displayed when sending newslaters.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                ) }
                            />

                            <FormField
                                control={ form.control }
                                name="email"
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="jappleseed@example.com" { ...field } />
                                        </FormControl>
                                        <FormDescription>
                                            This is the email address we&apos;ll use to send you newslaters.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                ) }
                            />
                            <Button type="submit">Save</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </>
    )
}

