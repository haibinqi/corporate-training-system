import React from 'react';
import { Download, Search, FileText, User, ChevronRight } from 'lucide-react';

export const ExamRecords: React.FC = () => {
    const records = [
        { id: '1', student: '张三', exam: '安全生产考核', score: 95, date: '2023-10-24 10:30', attempt: 1 },
        { id: '2', student: '李四', exam: '安全生产考核', score: 82, date: '2023-10-24 11:15', attempt: 2 },
        { id: '3', student: '王五', exam: '隐私保护认证', score: 70, date: '2023-10-23 15:00', attempt: 1 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">考试记录与统计</h2>
                    <p className="text-slate-500 text-sm">追溯所有学员的考试成绩与原始作答</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-emerald-500/20">
                    <Download size={18} /> 导出 Excel 报表
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-600 p-6 rounded-2xl text-white">
                    <p className="text-white/60 text-sm mb-1">本月考试总数</p>
                    <h3 className="text-3xl font-black">24</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-sm mb-1">参与学员</p>
                    <h3 className="text-3xl font-black text-slate-800">856</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-sm mb-1">平均通过率</p>
                    <h3 className="text-3xl font-black text-emerald-500">92.5%</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="搜索学员或考试名称..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {records.map(record => (
                        <div
                            key={record.id}
                            onClick={() => alert(`查看记录: ${record.id}`)}
                            className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-800">{record.student}</span>
                                        <span className="text-slate-400 text-xs text-center border px-1 rounded">第 {record.attempt} 次</span>
                                    </div>
                                    <p className="text-slate-500 text-sm">{record.exam}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className={`text-xl font-black ${record.score >= 80 ? 'text-emerald-500' : 'text-orange-500'}`}>
                                        {record.score}<span className="text-[10px] text-slate-400 ml-0.5">/100</span>
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-vibe">{record.date}</p>
                                </div>
                                <ChevronRight className="text-slate-200 group-hover:text-blue-500 transition-all" size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
