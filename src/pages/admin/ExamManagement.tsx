import React from 'react';
import { Plus, ClipboardCheck, Users, Calendar, ArrowRight } from 'lucide-react';

export const ExamManagement: React.FC = () => {
    const exams = [
        { id: 'EX001', title: '2023年度安全生产知识考核', courses: '安全生产合规培训', questions: 50, assigned: 120, status: 'Active' },
        { id: 'EX002', title: '数据安全与隐私保护认证', courses: '信息安全通用培训', questions: 30, assigned: 85, status: 'Draft' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">考试管理</h2>
                    <p className="text-slate-500 text-sm">设计试卷并分发给指定学员</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 transition-all">
                        分配考试
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/20">
                        <Plus size={18} /> 新建试卷
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {exams.map(exam => (
                    <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                <ClipboardCheck size={28} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-slate-800">{exam.title}</h3>
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
                        <button className="text-slate-300 hover:text-blue-600 transition-all">
                            <ArrowRight size={24} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
