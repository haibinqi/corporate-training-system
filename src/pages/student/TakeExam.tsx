import React, { useState } from 'react';
import { ChevronLeft, Clock, Send, CheckCircle2 } from 'lucide-react';

export const TakeExam: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});

    const questions = [
        {
            id: '1',
            type: 'SINGLE',
            content: '下列哪项不属于安全生产“三违”行为？',
            options: ['A. 违章指挥', 'B. 违章作业', 'C. 违反劳动纪律', 'D. 违反作息时间'],
            duration: '30 分'
        },
        {
            id: '2',
            type: 'SINGLE',
            content: '发生火灾时，正确的逃生方式是？',
            options: ['A. 乘坐电梯逃生', 'B. 贪恋财物', 'C. 用湿毛巾捂住口鼻低姿前行', 'D. 跳楼逃生'],
            duration: '30 分'
        },
        {
            id: '3',
            type: 'JUDGE',
            content: '生产经营单位必须依法参加工伤保险，为从业人员缴纳保险费。',
            options: ['正确', '错误'],
            duration: '40 分'
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fb] pb-24">
            {/* Header */}
            <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold text-slate-800">2023年度安全生产知识考核</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm">剩余时间</span>
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-mono font-bold">
                        <Clock size={16} />
                        42 : 15
                    </div>
                </div>
            </header>

            {/* Blue Progress Bar */}
            <div className="w-full h-1 bg-slate-100">
                <div className="h-full bg-blue-600 w-1/3 transition-all duration-500"></div>
            </div>

            <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
                {/* Exam Intro Card */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/10"></div>
                    <h2 className="text-2xl font-black text-slate-800 mb-4">考试说明</h2>
                    <p className="text-slate-500 leading-relaxed mb-6">
                        本试卷共含3道题，满分100分。请在规定时间内完成作答。提交后将立即显示您的得分。请注意，一旦提交将无法修改答案。
                    </p>
                    <div className="flex gap-4">
                        <Badge icon={<FileText size={14} />} label="共 3 题" color="blue" />
                        <Badge icon={<BarChart size={14} />} label="总分 100" color="purple" />
                        <Badge icon={<CheckCircle2 size={14} />} label="及格分 80" color="green" />
                    </div>
                </div>

                {/* Questions */}
                {questions.map((q, idx) => (
                    <div key={q.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 relative group transition-all hover:border-blue-200">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    {idx + 1}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.type === 'SINGLE' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                    }`}>
                                    {q.type === 'SINGLE' ? '单选题' : '判断题'}
                                </span>
                                <span className="text-slate-400 text-[10px] font-medium uppercase pt-0.5">{q.duration}</span>
                            </div>
                        </div>

                        <p className="text-lg font-bold text-slate-800">{q.content}</p>

                        <div className="space-y-3">
                            {q.options.map((option, i) => {
                                const isSelected = currentAnswers[q.id] === option;
                                return (
                                    <label
                                        key={i}
                                        className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all ${isSelected
                                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                                            : 'border-slate-100 hover:bg-slate-50'
                                            }`}
                                        onClick={() => setCurrentAnswers({ ...currentAnswers, [q.id]: option })}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-blue-600' : 'border-slate-300'
                                            }`}>
                                            {isSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>
                                            {option}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Submission Bar */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-8 py-5 flex justify-between items-center z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-6">
                    <div className="text-sm text-slate-500">
                        已回答 <span className="font-bold text-blue-600 text-lg">{Object.keys(currentAnswers).length}</span> / {questions.length} 题
                    </div>
                    <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${(Object.keys(currentAnswers).length / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all">
                    <Send size={18} />
                    提交试卷
                </button>
            </footer>
        </div>
    );
};

const Badge = ({ icon, label, color }: any) => {
    const colors: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
    };
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${colors[color]}`}>
            {icon}
            {label}
        </div>
    );
};

// Simple icon mocks for the badges
const FileText = ({ size }: { size?: number }) => <div style={{ width: size, height: size }} className="border-2 border-current rounded-sm"></div>;
const BarChart = ({ size }: { size?: number }) => <div style={{ width: size, height: size }} className="flex items-end gap-0.5"><div className="w-1 h-2 bg-current"></div><div className="w-1 h-3 bg-current"></div><div className="w-1 h-1.5 bg-current"></div></div>;
