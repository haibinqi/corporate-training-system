// functions/api/student/exams.ts
export const onRequestGet = async ({ request, env, context }) => {
    try {
        // In a real app, extraction from JWT/Session
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId') || 'stu_01';

        const assignments = await env.DB.prepare(`
      SELECT a.id as assignment_id, e.id as exam_id, e.title, e.description, e.questions, a.status, a.assigned_at
      FROM assignments a
      JOIN exams e ON a.exam_id = e.id
      WHERE a.student_id = ? AND a.status = 'PENDING'
      ORDER BY a.assigned_at DESC
    `).bind(userId).all();

        return Response.json(assignments.results);
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
