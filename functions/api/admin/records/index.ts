// functions/api/admin/records/index.ts
export const onRequestGet = async ({ env }) => {
    try {
        const records = await env.DB.prepare(`
      SELECT r.id, e.title as exam_title, u.real_name as student_name, r.score, r.completed_at
      FROM records r
      JOIN exams e ON r.exam_id = e.id
      JOIN users u ON r.student_id = u.id
      ORDER BY r.completed_at DESC
    `).all();
        return Response.json(records.results);
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
};
