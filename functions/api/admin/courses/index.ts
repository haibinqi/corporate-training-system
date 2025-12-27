// functions/api/admin/courses/index.ts
export const onRequestGet = async ({ env }) => {
    try {
        const courses = await env.DB.prepare(
            "SELECT id, title, content_type, content_body, status, created_at FROM courses ORDER BY created_at DESC"
        ).all();
        return Response.json(courses.results);
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};

export const onRequestPost = async ({ request, env }) => {
    try {
        const courseData = await request.json();
        const { title, content_type, content_body, status } = courseData;
        const id = Math.random().toString(36).substr(2, 9);

        await env.DB.prepare(
            "INSERT INTO courses (id, title, content_type, content_body, status, created_at) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(id, title, content_type, content_body, status || 'PUBLISHED', Date.now()).run();

        return Response.json({ success: true, id });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
