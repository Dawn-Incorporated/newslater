import { MailPreview } from "@/app/(pages)/account/(authenticated)/preview/server";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Preview() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="m-auto mb-10 mt-10 flex flex-col p-6 max-sm:w-screen">
            <Suspense fallback={<div>Loading...</div>}>
              <MailPreview />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export const dynamic = "force-dynamic";
