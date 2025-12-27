// functions/api/admin/export.ts
export const onRequestGet = async ({ env, data }) => {
    // Check Admin role
    if (data.user.role !== 'ADMIN') {
        return new Response("Forbidden", { status: 403 });
    }

    // Fetch all records with student details
    const { results } = await env.DB.prepare(`
    SELECT 
      u.real_name as "学员姓名",
      u.account as "学员账号",
      e.title as "考试名称",
      r.score as "得分",
      r.attempt_num as "考试次数",
      datetime(r.submitted_at / 1000, 'unixepoch', 'localtime') as "提交时间"
    FROM records r
    JOIN users u ON r.student_id = u.id
    JOIN exams e ON r.exam_id = e.id
    ORDER BY r.submitted_at DESC
  `).all();

    if (!results || results.length === 0) {
        return new Response("No records found", { status: 404 });
    }

    // Generate CSV
    const headers = Object.keys(results[0]);
    const csvRows = [headers.join(',')];

    for (const row of results) {
        const values = headers.map(header => {
            const val = row[header];
            return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
    }

    const csvContent = "\ufeff" + csvRows.join('\n'); // Add UTF-8 BOM for Excel

    return new Response(csvContent, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="exam_records_${Date.now()}.csv"`
        }
    });
};
