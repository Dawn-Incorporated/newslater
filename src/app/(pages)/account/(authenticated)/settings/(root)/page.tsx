import UserSettings, { schemaUserSettings } from "@/app/(pages)/account/(authenticated)/settings/(root)/client";
import { auth } from "@/auth";
import { db } from "@/server/db";
import { auth_users } from "@/server/db/schema";
import { log } from "byarutils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { SignIn } from "@/app/(pages)/account/(unauthenticated)/sign-in";

let user_id = "";
export default async function Page() {
    const session = await auth();

    if (!session || !session.user?.id) {
        return <SignIn/>
    }

    user_id = session.user.id;

   return <UserSettingsWrapper user_id={ user_id }/>
}

async function UserSettingsWrapper({user_id}: {user_id: string}) {
    const user = (await db.select().from(auth_users).where(eq(auth_users.id, user_id)))[0];

    return <UserSettings user={ user } callback={editAccount}/>

}

async function editAccount(values: z.infer<typeof schemaUserSettings>) {
    "use server"

    if (!user_id) {
        log("ERROR", "User settings", `Attempted to edit account without user_id set.`);
        return;
    }

    await db.update(auth_users)
        .set({
            name: values.name,
            email: values.email,
        })
        .where(eq(auth_users.id, user_id))
        .catch((error) => {
            log("ERROR", "DB", `Error during account update. Context: ${ JSON.stringify(error) }`);
        })
        .finally(() => {
            revalidatePath("/account/settings")
        });
}