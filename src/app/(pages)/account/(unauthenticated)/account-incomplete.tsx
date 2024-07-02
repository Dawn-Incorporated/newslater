"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/server/db/action/usersActions";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";

export function AccountIncompleteForm() {
  const { data: session } = useSession();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameValue = (
      event.currentTarget.elements.namedItem("name") as HTMLInputElement
    )?.value;

    if (session?.user?.email && typeof nameValue === "string") {
      await updateUser(session.user.email, nameValue);
      window.location.reload();
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <p className="text-center">
        You are signed in, but your account is not complete. Please complete
        your account.
      </p>
      <form className={"mt-5 flex gap-4"} onSubmit={handleSubmit}>
        <Input type="text" placeholder={"Name"} name="name" />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
