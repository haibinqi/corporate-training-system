// functions/api/student/submit.ts
export const onRequestPost = async ({ request, env }) => {
    try {
        const { assignment_id, exam_id, student_id, answers, score } = await request.json();

        if (!assignment_id || !exam_id || !student_id) {
            return new Response('Missing submission data', { status: 400 });
        }

        const record_id = Math.random().toString(36).substr(2, 9);
        const now = Date.now();

        // Transactional-like batch: Create Record + Update Assignment Status
        await env.DB.batch([
            env.DB.prepare(
                "INSERT INTO records (id, exam_id, student_id, score, answers, completed_at) VALUES (?, ?, ?, ?, ?, ?)"
            ).bind(record_id, exam_id, student_id, score, JSON.stringify(answers), now),

            env.DB.prepare(
                "UPDATE assignments SET status = 'COMPLETED', completed_at = ? WHERE id = ?"
            ).bind(now, assignment_id)
        ]);

        return Response.json({ success: true, score });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
