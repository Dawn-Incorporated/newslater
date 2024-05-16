import { getUsers } from "@/server/db/action/usersActions";

export const dynamic = "force-dynamic";

export async function GET() {
    const users = await getUsers();
    return new Response(JSON.stringify(users), {status: 200});
}