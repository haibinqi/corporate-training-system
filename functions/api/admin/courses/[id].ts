// functions/api/admin/courses/[id].ts
export const onRequestPut = async ({ params, request, env }) => {
    try {
        const { id } = params;
        const courseData = await request.json();
        const { title, content_type, content_body, status } = courseData;

        await env.DB.prepare(
            "UPDATE courses SET title = ?, content_type = ?, content_body = ?, status = ? WHERE id = ?"
        ).bind(title, content_type, content_body, status || 'PUBLISHED', id).run();

        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};

export const onRequestDelete = async ({ params, env }) => {
    try {
        const { id } = params;
        await env.DB.prepare("DELETE FROM courses WHERE id = ?").bind(id).run();
        return Response.json({ success: true });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
