'use client'

import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {UserCog} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";


export default function UserSettings() {


    return (
        <div className={"p-10 flex flex-col h-screen-bt-spacing justify-center"}>
            <div className={"absolute top-10 left-10 max-sm:hidden"}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className={"grid grid-cols-2 max-lg:grid-cols-1 gap-4 items-center"}>
                <div>
                    Left Side
                </div>
                <div className={"flex w-full h-full"}>
                    <form className={"w-full h-full"}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-2xl font-medium">Settings</CardTitle>
                                <UserCog className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent className={"flex flex-col items-center"}>
                                <div className={"flex flex-col gap-4"}>
                                    <label>
                                        <span>Username</span>
                                        <Input disabled={true} type="text" placeholder={"JAS"}/>
                                    </label>
                                    <label>
                                        <span>Full Name</span>
                                        <Input type="text" placeholder={"John AppleSeed"}/>
                                    </label>
                                    <label>
                                        <span>Email</span>
                                        <Input type="email" placeholder={"john@newslater.com"}/>
                                    </label>
                                    <label>
                                        <span>Password</span>
                                        <Input type="password" placeholder={"*************"}/>
                                    </label>
                                </div>
                            </CardContent>
                            <CardFooter className={"flex justify-center mt-10"}>
                                <Button className={"btn"}>Save</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    )

}