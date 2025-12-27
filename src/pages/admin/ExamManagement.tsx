import React, { useState, useEffect } from 'react';
import { Plus, Search, BookOpen, Clock, ChevronRight, MoreHorizontal, Edit, Trash2, X, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

interface Exam {
    id: string;
    title: string;
    description: string;
    questions: any[];
    related_course_ids: string[];
    created_at: number;
}

export const ExamManagement: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);

    const fetchExams = async () => {
        setLoading(true);
        try {
            const data = await api.getExams();
            setExams(data.map((exam: any) => ({
                ...exam,
                questions: typeof exam.questions === 'string' ? JSON.parse(exam.questions) : exam.questions,
                related_course_ids: typeof exam.related_course_ids === 'string' ? JSON.parse(exam.related_course_ids) : exam.related_course_ids
            })));
        } catch (error) {
            alert('加载考试列表失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('确定要删除此考试吗？对应的题目也将被移除。')) {
            try {
                await api.deleteExam(id);
                fetchExams();
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
                        考试分发系统
                        {loading && <RefreshCw className="animate-spin text-blue-500" size={20} />}
                    </h2>
                    <p className="text-slate-500 text-sm">发布试卷并管理题目、时长及及格分数 (同步 D1 数据库)</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                    <Plus size={18} /> 创建新试卷
                </button>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                    <RefreshCw className="animate-spin mb-4" size={32} />
                    <p>正在拉取最新题库...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.map(exam => (
                        <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
                                <button onClick={() => setEditingExam(exam)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => handleDelete(exam.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <FileText size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{exam.title}</h3>
                                <p className="text-sm text-slate-400 mt-1 line-clamp-2">{exam.description || '暂无说明'}</p>
                            </div>

                            <div className="space-y-3 py-4 border-t border-slate-50 mt-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <CheckCircle2 size={14} className="text-green-500" />
                                    <span>题目数量: {exam.questions?.length || 0} 题</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <Clock size={14} className="text-blue-500" />
                                    <span>及格线: 80 分</span>
                                </div>
                            </div>

                            <button className="w-full mt-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                                管理题目与指派 <ChevronRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
