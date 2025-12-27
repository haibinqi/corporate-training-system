import React, { useState } from 'react';
import { Plus, BookOpen, ExternalLink, FileText, MoreVertical, Edit2, Trash2, Eye, X, Link, Type } from 'lucide-react';

export const CourseManagement: React.FC = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

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
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    <Plus size={18} /> 新建课程
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group relative cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${course.type === 'PDF' ? 'bg-red-50 text-red-600' :
                                course.type === 'LINK' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                {course.type === 'PDF' ? <FileText size={20} /> :
                                    course.type === 'LINK' ? <ExternalLink size={20} /> : <BookOpen size={20} />}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenu(openMenu === course.id ? null : course.id);
                                    }}
                                    className="text-slate-300 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {openMenu === course.id && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setOpenMenu(null)}></div>
                                        <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-30 animate-in fade-in zoom-in duration-200">
                                            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                                                <Eye size={14} /> 查看内容
                                            </button>
                                            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                                                <Edit2 size={14} /> 编辑课程
                                            </button>
                                            <div className="h-px bg-slate-50 my-1"></div>
                                            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                                                <Trash2 size={14} /> 删除
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
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

            {/* Create Course Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)}></div>
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-60 overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-300">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">新建课程</h3>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setShowCreateModal(false); }}>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">课程标题</label>
                                <input type="text" placeholder="输入课程名称" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-medium" required />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 block">课程类型</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <TypeCard icon={<FileText size={18} />} label="PDF" active />
                                    <TypeCard icon={<Link size={18} />} label="超链接" />
                                    <TypeCard icon={<Type size={18} />} label="富文本" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">课程描述 (可选)</label>
                                <textarea placeholder="简要描述课程内容..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all h-24 resize-none" />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">取消</button>
                                <button type="submit" className="flex-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                    立即上传
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const TypeCard = ({ icon, label, active = false }: any) => (
    <div className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${active ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
        }`}>
        {icon}
        <span className="text-[10px] font-black uppercase text-center">{label}</span>
    </div>
);
