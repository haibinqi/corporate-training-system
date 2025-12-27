import React, { useState, useEffect } from 'react';
import { Plus, Search, Book, Video, Link as LinkIcon, MoreHorizontal, Edit, Trash2, X, RefreshCw, FileText } from 'lucide-react';
import { api } from '../../services/api';

interface Course {
    id: string;
    title: string;
    content_type: 'FILE' | 'TEXT' | 'LINK';
    content_body: string;
    status: 'PUBLISHED' | 'UNPUBLISHED';
    created_at: number;
}

export const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await api.getCourses();
            setCourses(data);
        } catch (error) {
            alert('加载课程失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const courseData = {
                title: formData.get('title') as string,
                content_type: formData.get('type') as any,
                content_body: formData.get('body') as string,
                status: 'PUBLISHED'
            };
            await api.createCourse(courseData);
            fetchCourses();
            setShowCreateModal(false);
        } catch (error) {
            alert('创建失败');
        }
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingCourse) return;
        const formData = new FormData(e.currentTarget);
        try {
            const courseData = {
                title: formData.get('title') as string,
                content_type: formData.get('type') as any,
                content_body: formData.get('body') as string,
                status: editingCourse.status
            };
            await api.updateCourse(editingCourse.id, courseData);
            fetchCourses();
            setEditingCourse(null);
        } catch (error) {
            alert('更新失败');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('确定要删除此课程吗？')) {
            try {
                await api.deleteCourse(id);
                fetchCourses();
            } catch (error) {
                alert('删除失败');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        课程资料库
                        {loading && <RefreshCw className="animate-spin text-blue-500" size={20} />}
                    </h2>
                    <p className="text-slate-500 text-sm">管理并发布学习资料给学员 (同步 D1 数据库)</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                    <Plus size={18} /> 新增学习资料
                </button>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                    <RefreshCw className="animate-spin mb-4" size={32} />
                    <p>正在拉取最新资料库...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${course.content_type === 'FILE' ? 'bg-red-50 text-red-600' :
                                    course.content_type === 'TEXT' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                    }`}>
                                    {course.content_type === 'FILE' ? <FileText size={24} /> :
                                        course.content_type === 'TEXT' ? <Book size={24} /> : <LinkIcon size={24} />}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingCourse(course)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{course.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                <span>{course.content_type}</span>
                                <span>•</span>
                                <span>{new Date(course.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <Modal title="新增资料" onClose={() => setShowCreateModal(false)}>
                    <form className="space-y-6" onSubmit={handleCreate}>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">资料标题</label>
                            <input name="title" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">类型</label>
                                <select name="type" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold">
                                    <option value="FILE">PDF文档</option>
                                    <option value="LINK">外部链接</option>
                                    <option value="TEXT">Markdown正文</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">内容/地址</label>
                            <textarea name="body" rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">创建并发布</button>
                    </form>
                </Modal>
            )}

            {/* Edit Modal */}
            {editingCourse && (
                <Modal title="编辑资料" onClose={() => setEditingCourse(null)}>
                    <form className="space-y-6" onSubmit={handleEdit}>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">资料标题</label>
                            <input name="title" defaultValue={editingCourse.title} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">类型</label>
                            <select name="type" defaultValue={editingCourse.content_type} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold">
                                <option value="FILE">PDF文档</option>
                                <option value="LINK">外部链接</option>
                                <option value="TEXT">Markdown正文</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">内容/地址</label>
                            <textarea name="body" defaultValue={editingCourse.content_body} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">保存修改</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

const Modal = ({ title, children, onClose }: any) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-60 overflow-hidden animate-in zoom-in slide-in-from-bottom-5">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-slate-400 shadow-sm transition-all"><X size={20} /></button>
            </div>
            <div className="p-8">{children}</div>
        </div>
    </div>
);
