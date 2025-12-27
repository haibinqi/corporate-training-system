import React, { useState } from 'react';
import { ClipboardList, History, LogOut, Clock, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { TakeExam } from './TakeExam';

type StudentView = 'exams' | 'history' | 'taking';

export const StudentDashboard: React.FC = () => {
    const [view, setView] = useState<StudentView>('exams');

    if (view === 'taking') {
        return <TakeExam onBack={() => setView('exams')} />;
    }

    const renderContent = () => {
        if (view === 'exams') {
            return (
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            待参加考试
                        </h2>

                        <ExamCard
                            title="2023年度安全生产知识考核"
                            course="安全生产合规培训"
                            duration="60分钟"
                            questions="50题"
                            deadline="2023-12-31"
                            onTake={() => setView('taking')}
                        />
                        <ExamCard
                            title="数据安全与隐私保护认证"
                            course="信息安全通用培训"
                            duration="45分钟"
                            questions="30题"
                            deadline="2023-11-15"
                            onTake={() => setView('taking')}
                        />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                            最近统计
                        </h2>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <p className="text-slate-400 text-xs mb-1">已完成</p>
                                    <p className="text-2xl font-black text-slate-800">12</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <p className="text-slate-400 text-xs mb-1">平均分</p>
                                    <p className="text-2xl font-black text-blue-600">88.5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <History size={24} className="text-slate-400" />
                    个人历史考试记录
                </h2>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        <HistoryItem title="2023年度安全生产知识考核" score={95} date="2023-10-24 10:30" attempt={1} />
                        <HistoryItem title="员工手册合规自测" score={88} date="2023-10-15 14:00" attempt={1} />
                        <HistoryItem title="消防安全基础培训" score={100} date="2023-09-20 09:15" attempt={1} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f7fa] flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                        <ClipboardList size={20} />
                    </div>
                    <span className="font-bold text-lg text-slate-800">学员考试中心</span>
                </div>

                <nav className="flex items-center gap-8">
                    <button
                        onClick={() => setView('exams')}
                        className={`font-bold flex items-center gap-2 transition-colors ${view === 'exams' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <ClipboardList size={18} /> 待参加考试
                    </button>
                    <button
                        onClick={() => setView('history')}
                        className={`font-bold flex items-center gap-2 transition-colors ${view === 'history' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <History size={18} /> 个人历史记录
                    </button>
                </nav>

                <div className="flex items-center gap-4 border-l pl-8">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-800">张三</p>
                        <p className="text-[12px] text-slate-400">学号: STU2023001</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {/* Hero Section (Only on main dashboard) */}
            {view === 'exams' && (
                <div className="bg-blue-600 text-white py-12 px-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-black mb-2">你好，张三</h1>
                        <p className="opacity-80">你有 3 门待参加的合规性考核，请及时完成。</p>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className={`flex-1 p-8 ${view === 'exams' ? '-mt-6' : 'mt-4'}`}>
                {renderContent()}
            </main>
        </div>
    );
};

const ExamCard = ({ title, course, duration, questions, deadline, onTake }: any) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
        <div className="flex justify-between items-start">
            <div className="space-y-4 flex-1">
                <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">PENDING</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-2">{title}</h3>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-300" /> {duration}</span>
                    <span className="flex items-center gap-1.5"><ClipboardList size={16} className="text-slate-300" /> {questions}</span>
                    <span className="text-red-400 font-medium">截止日期: {deadline}</span>
                </div>
                <p className="text-slate-400 text-sm">关联课程: <span className="text-slate-600">{course}</span></p>
            </div>
            <button
                onClick={onTake}
                className="bg-slate-50 text-slate-400 p-4 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
            >
                <ArrowRight size={24} />
            </button>
        </div>
    </div>
);

const HistoryItem = ({ title, score, date, attempt }: any) => (
    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={24} />
            </div>
            <div>
                <h4 className="font-bold text-slate-800">{title}</h4>
                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span>提交时间: {date}</span>
                    <span className="w-px h-3 bg-slate-200"></span>
                    <span>第 {attempt} 次提交</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="text-right">
                <p className="text-2xl font-black text-blue-600">{score}<span className="text-[10px] text-slate-400 ml-0.5">/100</span></p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">PASS</p>
            </div>
            <ChevronRight className="text-slate-200 group-hover:text-blue-500 transition-all" />
        </div>
    </div>
);
