-- schema.sql

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    account TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('ADMIN', 'STUDENT')) NOT NULL,
    status TEXT CHECK(status IN ('ACTIVE', 'RESIGNED', 'FROZEN')) DEFAULT 'ACTIVE',
    real_name TEXT NOT NULL,
    created_at INTEGER NOT NULL
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content_type TEXT CHECK(content_type IN ('FILE', 'TEXT', 'LINK')) NOT NULL,
    content_body TEXT, -- Markdown or URL
    status TEXT CHECK(status IN ('PUBLISHED', 'UNPUBLISHED')) DEFAULT 'PUBLISHED',
    created_at INTEGER NOT NULL
);

-- Exams Table
CREATE TABLE IF NOT EXISTS exams (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    questions TEXT NOT NULL, -- JSON string of Question[]
    related_course_ids TEXT, -- JSON string of string[]
    created_by TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY(created_by) REFERENCES users(id)
);

-- Exam Assignments Table (links a student to an exam instance)
CREATE TABLE IF NOT EXISTS assignments (
    id TEXT PRIMARY KEY,
    exam_id TEXT NOT NULL,
    student_id TEXT NOT NULL,
    assigned_by TEXT NOT NULL,
    assigned_at INTEGER NOT NULL,
    status TEXT CHECK(status IN ('PENDING', 'COMPLETED')) DEFAULT 'PENDING',
    FOREIGN KEY(exam_id) REFERENCES exams(id),
    FOREIGN KEY(student_id) REFERENCES users(id),
    FOREIGN KEY(assigned_by) REFERENCES users(id)
);

-- Exam Records Table (Traceability/Permanent storage)
CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    assignment_id TEXT UNIQUE NOT NULL,
    student_id TEXT NOT NULL,
    exam_id TEXT NOT NULL,
    score REAL NOT NULL,
    answers TEXT NOT NULL, -- JSON string of student responses
    submitted_at INTEGER NOT NULL,
    attempt_num INTEGER NOT NULL, -- To track retakes via new assignments
    FOREIGN KEY(assignment_id) REFERENCES assignments(id),
    FOREIGN KEY(student_id) REFERENCES users(id),
    FOREIGN KEY(exam_id) REFERENCES exams(id)
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    target_id TEXT,
    details TEXT,
    timestamp INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
-- Seed Data
INSERT INTO users (id, account, password_hash, role, status, real_name, created_at) 
VALUES ('admin_01', 'admin', 'admin123', 'ADMIN', 'ACTIVE', '系统管理员', 1700000000000);

INSERT INTO users (id, account, password_hash, role, status, real_name, created_at) 
VALUES ('stu_01', 'stu123', 'pass123', 'STUDENT', 'ACTIVE', '陈小明', 1700000000000);

INSERT INTO users (id, account, password_hash, role, status, real_name, created_at) 
VALUES ('stu_02', 'stu456', 'pass123', 'STUDENT', 'ACTIVE', '王大锤', 1700000000000);
