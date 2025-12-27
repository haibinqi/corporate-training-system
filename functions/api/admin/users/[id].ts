// functions/api/admin/users/[id].ts
export const onRequestPut = async ({ params, request, env }) => {
    try {
        const { id } = params;
        const userData = await request.json();
        const { account, role, status, name, password } = userData;

        if (password) {
            await env.DB.prepare(
                "UPDATE users SET account = ?, role = ?, status = ?, real_name = ?, password_hash = ? WHERE id = ?"
            ).bind(account, role, status, name, password, id).run();
        } else {
            await env.DB.prepare(
                "UPDATE users SET account = ?, role = ?, status = ?, real_name = ? WHERE id = ?"
            ).bind(account, role, status, name, id).run();
        }

        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};

export const onRequestDelete = async ({ params, env }) => {
    try {
        const { id } = params;
        await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
