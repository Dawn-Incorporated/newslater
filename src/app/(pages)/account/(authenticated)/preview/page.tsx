import { MailPreview } from "@/app/(pages)/account/(authenticated)/preview/server";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Preview() {
    return (

        <>
            <Card>
                <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>

                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col max-sm:w-screen m-auto mt-10 mb-10 p-6">
                        <Suspense fallback={<div>Loading...</div>}>
                            <MailPreview/>
                        </Suspense>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export const dynamic = 'force-dynamic'
