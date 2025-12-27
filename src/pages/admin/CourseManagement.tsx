import React from 'react';
import { Plus, BookOpen, ExternalLink, FileText, MoreVertical } from 'lucide-react';

export const CourseManagement: React.FC = () => {
    const courses = [
        { id: '1', title: '2024年度安全生产核心指南', type: 'PDF', status: 'PUBLISHED', date: '2023-12-01' },
        { id: '2', title: '员工手册及合规准则', type: 'LINK', status: 'PUBLISHED', date: '2023-11-20' },
        { id: '3', title: '消防安全实操演示', type: 'TEXT', status: 'UNPUBLISHED', date: '2023-11-15' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">课程管理</h2>
                    <p className="text-slate-500 text-sm">发布和管理学习资料（不记录进度）</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/20">
                    <Plus size={18} /> 新建课程
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${course.type === 'PDF' ? 'bg-red-50 text-red-600' :
                                    course.type === 'LINK' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                {course.type === 'PDF' ? <FileText size={20} /> :
                                    course.type === 'LINK' ? <ExternalLink size={20} /> : <BookOpen size={20} />}
                            </div>
                            <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={18} /></button>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">{course.type} · {course.date}</p>
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                            <span className={`px-2 py-1 rounded text-[10px] font-black ${course.status === 'PUBLISHED' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                {course.status === 'PUBLISHED' ? '已上架' : '已下架'}
                            </span>
                            <button className="text-blue-600 text-sm font-bold hover:underline">编辑内容</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
