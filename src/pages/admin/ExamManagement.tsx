import React, { useState } from 'react';
import { Plus, ClipboardCheck, Users, Calendar, ArrowRight, X, BookOpen, Clock, Target } from 'lucide-react';

interface Exam {
    id: string;
    title: string;
    courses: string;
    questions: number;
    assigned: number;
    status: 'Active' | 'Draft';
}

export const ExamManagement: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>([
        { id: 'EX001', title: '2023年度安全生产知识考核', courses: '安全生产合规培训', questions: 50, assigned: 120, status: 'Active' },
        { id: 'EX002', title: '数据安全与隐私保护认证', courses: '信息安全通用培训', questions: 30, assigned: 85, status: 'Draft' },
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newExam: Exam = {
            id: 'EX' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
            title: formData.get('title') as string,
            courses: formData.get('course') as string || '未关联',
            questions: 0,
            assigned: 0,
            status: 'Draft'
        };
        setExams([newExam, ...exams]);
        setShowCreateModal(false);
    };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingExam) return;
        const formData = new FormData(e.currentTarget);
        const updatedExams = exams.map(ex => ex.id === editingExam.id ? {
            ...ex,
            title: formData.get('title') as string,
            courses: formData.get('course') as string || ex.courses,
        } : ex);
        setExams(updatedExams);
        setEditingExam(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">考试管理</h2>
                    <p className="text-slate-500 text-sm">设计试卷并分发给指定学员</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 transition-all active:scale-95">
                        分配考试
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <Plus size={18} /> 新建试卷
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {exams.map(exam => (
                    <div key={exam.id} onClick={() => setEditingExam(exam)} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-slate-50 group-hover:bg-blue-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                                <ClipboardCheck size={28} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{exam.title}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${exam.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {exam.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> ID: {exam.id}</span>
                                    <span className="flex items-center gap-1.5"><ClipboardCheck size={14} /> {exam.questions} 题</span>
                                    <span className="flex items-center gap-1.5"><Users size={14} /> 已分配 {exam.assigned} 人</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-slate-300 group-hover:text-blue-600 transition-all">
                            <ArrowRight size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Exam Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)}></div>
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-60 overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-300">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">新建试卷</h3>
                                <p className="text-xs text-slate-400 font-medium">配置试卷基础信息与规则</p>
                            </div>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white rounded-full text-slate-400 shadow-sm border border-transparent hover:border-slate-100 transition-all">
                                <X size={20} />
                            </button>
                        </div>
                        <form className="p-8 space-y-8" onSubmit={handleCreate}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Target size={14} className="text-blue-500" /> 试卷名称</label>
                                    <input name="title" type="text" placeholder="例如：2024年度合规性考核" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" required />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><BookOpen size={14} className="text-purple-500" /> 关联课程 (可选)</label>
                                        <select name="course" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold text-slate-700">
                                            <option value="">不关联课程</option>
                                            <option value="安全生产核心指南">安全生产核心指南</option>
                                            <option value="员工手册及合规准则">员工手册及合规准则</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Clock size={14} className="text-orange-500" /> 考试时长 (分钟)</label>
                                        <input type="number" defaultValue="60" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold text-slate-700" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">稍后配置</button>
                                <button type="submit" className="flex-2 bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                    下一步：设计题目
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Exam Modal */}
            {editingExam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setEditingExam(null)}></div>
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-60 overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-300">
                        <div className="p-6 border-b flex justify-between items-center bg-blue-50/30">
                            <h3 className="text-xl font-bold text-blue-800">编辑试卷信息</h3>
                            <button onClick={() => setEditingExam(null)} className="p-2 hover:bg-white rounded-full text-slate-400 shadow-sm transition-all">
                                <X size={20} />
                            </button>
                        </div>
                        <form className="p-8 space-y-8" onSubmit={handleEdit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Target size={14} className="text-blue-500" /> 试卷名称</label>
                                    <input name="title" type="text" defaultValue={editingExam.title} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-medium" required />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><BookOpen size={14} className="text-purple-500" /> 关联课程</label>
                                        <select name="course" defaultValue={editingExam.courses} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold text-slate-700">
                                            <option value="安全生产核心指南">安全生产核心指南</option>
                                            <option value="员工手册及合规准则">员工手册及合规准则</option>
                                            <option value="未关联">未关联</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setEditingExam(null)} className="flex-1 px-4 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">取消</button>
                                <button type="submit" className="flex-2 bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                    保存修改
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
