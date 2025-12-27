// functions/api/admin/assignments/index.ts
export const onRequestPost = async ({ request, env }) => {
    try {
        const { exam_id, student_ids } = await request.json();
        const admin_id = 'admin_01'; // Mock or from middleware

        if (!exam_id || !student_ids || !Array.isArray(student_ids)) {
            return new Response('Invalid request body', { status: 400 });
        }

        const queries = student_ids.map(student_id => {
            const id = Math.random().toString(36).substr(2, 9);
            return env.DB.prepare(
                "INSERT INTO assignments (id, exam_id, student_id, assigned_by, assigned_at, status) VALUES (?, ?, ?, ?, ?, 'PENDING')"
            ).bind(id, exam_id, student_id, admin_id, Date.now());
        });

        await env.DB.batch(queries);

        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
