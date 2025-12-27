// functions/api/student/submit.ts
export const onRequestPost = async ({ request, env, data }) => {
    const { assignment_id, answers } = await request.json();
    const userId = data.user.id;

    // 1. Validate Assignment
    const assignment = await env.DB.prepare(
        "SELECT * FROM assignments WHERE id = ? AND student_id = ? AND status = 'PENDING'"
    ).bind(assignment_id, userId).first();

    if (!assignment) {
        return new Response(JSON.stringify({ error: "Invalid or already completed assignment" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    // 2. Fetch Exam Questions
    const exam = await env.DB.prepare(
        "SELECT questions FROM exams WHERE id = ?"
    ).bind(assignment.exam_id).first();
    const questions = JSON.parse(exam.questions);

    // 3. Score Calculation
    let totalScore = 0;
    questions.forEach((q: any) => {
        if (answers[q.id] === q.answer) {
            totalScore += q.score;
        }
    });

    // 4. Traceability: Permanent Record Creation (Atomic)
    const recordId = crypto.randomUUID();
    const now = Date.now();

    // Get current attempt number
    const prevRecords = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM records WHERE student_id = ? AND exam_id = ?"
    ).bind(userId, assignment.exam_id).first();
    const attemptNum = (prevRecords?.count || 0) + 1;

    try {
        await env.DB.batch([
            // Insert Record
            env.DB.prepare(`
        INSERT INTO records (id, assignment_id, student_id, exam_id, score, answers, submitted_at, attempt_num)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(recordId, assignment_id, userId, assignment.exam_id, totalScore, JSON.stringify(answers), now, attemptNum),

            // Update Assignment status
            env.DB.prepare("UPDATE assignments SET status = 'COMPLETED' WHERE id = ?")
                .bind(assignment_id),

            // Log Action
            env.DB.prepare(`
        INSERT INTO audit_logs (id, user_id, action, target_id, details, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(crypto.randomUUID(), userId, 'SUBMIT_EXAM', assignment.exam_id, `Score: ${totalScore}`, now)
        ]);

        return new Response(JSON.stringify({ success: true, score: totalScore }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Database error during submission" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
