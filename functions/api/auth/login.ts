// functions/api/auth/login.ts
export const onRequestPost = async ({ request, env }) => {
    try {
        const { account, password } = await request.json();

        if (!account || !password) {
            return new Response('Missing credentials', { status: 400 });
        }

        // Fetch user from D1
        // Note: In production, use bcrypt/argon2 for password hashing
        const user = await env.DB.prepare(
            "SELECT id, account, role, real_name FROM users WHERE account = ? AND password_hash = ? AND status = 'ACTIVE'"
        ).bind(account, password).first();

        if (!user) {
            return new Response('Invalid credentials or account frozen', { status: 401 });
        }

        // Return user info
        // For simplicity, we just return the user object. 
        // In a real app, you'd set a secure cookie or return a JWT.
        return new Response(JSON.stringify({
            id: user.id,
            account: user.account,
            role: user.role,
            name: user.real_name
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
