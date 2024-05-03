export const dynamic = "force-dynamic";
const user = require('@api/_system/controller/UserController');

export async function GET() {
    const users = await user.getUsersApi();
    return new Response(JSON.stringify(users), {status: 200});
}