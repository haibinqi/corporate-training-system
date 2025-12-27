// src/services/api.ts

const API_BASE = '/api';

export interface User {
    id: string;
    account: string;
    role: 'ADMIN' | 'STUDENT';
    name: string;
}

export const api = {
    // Auth
    async login(account: string, password: string): Promise<User> {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account, password }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || '登录失败');
        }

        return res.json();
    },

    // Admin: Users
    async getUsers(role: 'ADMIN' | 'STUDENT'): Promise<any[]> {
        const res = await fetch(`${API_BASE}/admin/users`, {
            headers: this.getAuthHeaders(role),
        });
        if (!res.ok) throw new Error('获取用户列表失败');
        return res.json();
    },

    async createUser(userData: any, adminRole: string): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/users`, {
            method: 'POST',
            headers: {
                ...this.getAuthHeaders(adminRole),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });
        if (!res.ok) throw new Error('创建用户失败');
        return res.json();
    },

    async updateUser(id: string, userData: any, adminRole: string): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/users/${id}`, {
            method: 'PUT',
            headers: {
                ...this.getAuthHeaders(adminRole),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });
        if (!res.ok) throw new Error('更新用户失败');
        return res.json();
    },

    async deleteUser(id: string, adminRole: string): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/users/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders(adminRole),
        });
        if (!res.ok) throw new Error('删除用户失败');
        return res.json();
    },

    // Admin: Courses
    async getCourses(): Promise<any[]> {
        const res = await fetch(`${API_BASE}/admin/courses`, {
            headers: this.getAuthHeaders('ADMIN'),
        });
        if (!res.ok) throw new Error('获取课程列表失败');
        return res.json();
    },

    async createCourse(courseData: any): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/courses`, {
            method: 'POST',
            headers: { ...this.getAuthHeaders('ADMIN'), 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData),
        });
        if (!res.ok) throw new Error('创建课程失败');
        return res.json();
    },

    async updateCourse(id: string, courseData: any): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/courses/${id}`, {
            method: 'PUT',
            headers: { ...this.getAuthHeaders('ADMIN'), 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData),
        });
        if (!res.ok) throw new Error('更新课程失败');
        return res.json();
    },

    async deleteCourse(id: string): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/courses/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders('ADMIN'),
        });
        if (!res.ok) throw new Error('删除课程失败');
        return res.json();
    },

    // Admin: Exams
    async getExams(): Promise<any[]> {
        const res = await fetch(`${API_BASE}/admin/exams`, {
            headers: this.getAuthHeaders('ADMIN'),
        });
        if (!res.ok) throw new Error('获取考试列表失败');
        return res.json();
    },

    async createExam(examData: any): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/exams`, {
            method: 'POST',
            headers: { ...this.getAuthHeaders('ADMIN'), 'Content-Type': 'application/json' },
            body: JSON.stringify(examData),
        });
        if (!res.ok) throw new Error('创建考试失败');
        return res.json();
    },

    async updateExam(id: string, examData: any): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/exams/${id}`, {
            method: 'PUT',
            headers: { ...this.getAuthHeaders('ADMIN'), 'Content-Type': 'application/json' },
            body: JSON.stringify(examData),
        });
        if (!res.ok) throw new Error('更新考试失败');
        return res.json();
    },

    async deleteExam(id: string): Promise<any> {
        const res = await fetch(`${API_BASE}/admin/exams/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders('ADMIN'),
        });
        if (!res.ok) throw new Error('删除考试失败');
        return res.json();
    },

    // Student
    async getStudentExams(userId: string): Promise<any[]> {
        const res = await fetch(`${API_BASE}/student/exams?userId=${userId}`, {
            headers: this.getAuthHeaders('STUDENT'),
        });
        if (!res.ok) throw new Error('获取我的考试失败');
        return res.json();
    },

    async submitExam(submissionData: any): Promise<any> {
        const res = await fetch(`${API_BASE}/student/submit`, {
            method: 'POST',
            headers: { ...this.getAuthHeaders('STUDENT'), 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });
        if (!res.ok) throw new Error('交卷失败');
        return res.json();
    },

    // Admin: Records
    async getRecords(): Promise<any[]> {
        const res = await fetch(`${API_BASE}/admin/records`, {
            headers: this.getAuthHeaders('ADMIN'),
        });
        if (!res.ok) throw new Error('获取记录失败');
        return res.json();
    },

    // Helper for mock session headers used by functions/_middleware.ts
    getAuthHeaders(role: string) {
        // Note: In a real app, store this in localStorage/cookie and use current user ID
        return {
            'Authorization': `${role} dummy_id`
        };
    }
};
