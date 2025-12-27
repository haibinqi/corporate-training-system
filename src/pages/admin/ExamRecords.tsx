import React, { useState, useEffect } from 'react';
import { Download, Search, RefreshCw, User, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';

export const ExamRecords: React.FC = () => {
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const data = await api.getRecords();
            setRecords(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        考核留痕档案
                        {loading && <RefreshCw className="animate-spin text-blue-500" size={20} />}
                    </h2>
                    <p className="text-slate-500 text-sm">追溯所有学员的考试成绩与原始作答 (同步 D1 数据库)</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                    <Download size={18} /> 导出 Excel 报表
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-600 p-6 rounded-2xl text-white">
                    <p className="text-white/60 text-sm mb-1">系统已完成考核</p>
                    <h3 className="text-3xl font-black">{records.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-sm mb-1">参与人次</p>
                    <h3 className="text-3xl font-black text-slate-800">{new Set(records.map(r => r.student_name)).size}</h3>
                </div>
                <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm`}>
                    <p className="text-slate-400 text-sm mb-1">及格率</p>
                    <h3 className="text-3xl font-black text-emerald-500">
                        {records.length > 0 ? ((records.filter(r => r.score >= 80).length / records.length) * 100).toFixed(1) : 0}%
                    </h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="搜索学员或考试名称..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition-all text-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                        <RefreshCw className="animate-spin mb-4" size={32} />
                        <p>同步归档数据中...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {records.length === 0 ? (
                            <div className="py-20 text-center text-slate-400 font-medium">暂无考试提交记录</div>
                        ) : (
                            records.map(record => (
                                <div
                                    key={record.id}
                                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-800">{record.student_name}</span>
                                            </div>
                                            <p className="text-slate-500 text-sm">{record.exam_title}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className={`text-xl font-black ${record.score >= 80 ? 'text-emerald-500' : 'text-orange-500'}`}>
                                                {record.score}<span className="text-[10px] text-slate-400 ml-0.5">/100</span>
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                {new Date(record.completed_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <ChevronRight className="text-slate-200 group-hover:text-blue-500 transition-all" size={20} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
