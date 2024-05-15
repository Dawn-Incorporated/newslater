import user from "@/server/controller/UserController";

export const dynamic = "force-dynamic";

export async function GET() {
    const users = await user.getUsersApi();
    return new Response(JSON.stringify(users), {status: 200});
}