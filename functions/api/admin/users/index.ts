// functions/api/admin/users/index.ts
export const onRequestGet = async ({ env }) => {
    try {
        const users = await env.DB.prepare(
            "SELECT id, account, role, status, real_name, created_at FROM users ORDER BY created_at DESC"
        ).all();
        return Response.json(users.results);
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};

export const onRequestPost = async ({ request, env }) => {
    try {
        const userData = await request.json();
        const { id, account, password, role, status, name } = userData;

        if (!id || !account || !password || !role || !name) {
            return new Response('Missing required fields', { status: 400 });
        }

        await env.DB.prepare(
            "INSERT INTO users (id, account, password_hash, role, status, real_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(id, account, password, role, status || 'ACTIVE', name, Date.now()).run();

        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
