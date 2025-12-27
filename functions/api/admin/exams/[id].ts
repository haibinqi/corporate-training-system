// functions/api/admin/exams/[id].ts
export const onRequestPut = async ({ params, request, env }) => {
    try {
        const { id } = params;
        const examData = await request.json();
        const { title, description, questions, related_course_ids } = examData;

        await env.DB.prepare(
            "UPDATE exams SET title = ?, description = ?, questions = ?, related_course_ids = ? WHERE id = ?"
        ).bind(title, description, JSON.stringify(questions), JSON.stringify(related_course_ids || []), id).run();

        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};

export const onRequestDelete = async ({ params, env }) => {
    try {
        const { id } = params;
        await env.DB.prepare("DELETE FROM exams WHERE id = ?").bind(id).run();
        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
