// functions/api/admin/exams/index.ts
export const onRequestGet = async ({ env }) => {
    try {
        const exams = await env.DB.prepare(
            "SELECT id, title, description, questions, related_course_ids, created_at FROM exams ORDER BY created_at DESC"
        ).all();
        return Response.json(exams.results);
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};

export const onRequestPost = async ({ request, env, context }) => {
    try {
        const examData = await request.json();
        const { title, description, questions, related_course_ids } = examData;
        const id = Math.random().toString(36).substr(2, 9);
        const creator_id = 'admin_01'; // Mock or from middleware

        await env.DB.prepare(
            "INSERT INTO exams (id, title, description, questions, related_course_ids, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(id, title, description, JSON.stringify(questions), JSON.stringify(related_course_ids || []), creator_id, Date.now()).run();

        return Response.json({ success: true, id });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
