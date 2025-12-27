import React, { useState } from 'react';
import { ChevronLeft, Clock, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

interface TakeExamProps {
    assignmentId: string;
    examId: string;
    userId: string;
    title: string;
    questions: any[];
    onBack: () => void;
}

export const TakeExam: React.FC<TakeExamProps> = ({ assignmentId, examId, userId, title, questions, onBack }) => {
    const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Simplified score calculation (correct if answered)
            const answeredCount = Object.keys(currentAnswers).length;
            const calculatedScore = Math.floor((answeredCount / (questions.length || 1)) * 100);

            await api.submitExam({
                assignment_id: assignmentId,
                exam_id: examId,
                student_id: userId,
                answers: currentAnswers,
                score: calculatedScore
            });

            setScore(calculatedScore);
            setIsSubmitted(true);
        } catch (error) {
            alert('交卷失败，请检查网络后重试');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center p-4">
                <div className="bg-white p-12 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full text-center space-y-8 animate-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 size={48} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">考试成功提交！</h2>
                        <p className="text-slate-500 font-medium">您的本次考核结果已存入系统留痕库。</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">您的得分</p>
                        <p className="text-5xl font-black text-blue-600">{score}<span className="text-lg text-slate-300 ml-1">/ 100</span></p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <button onClick={onBack} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95">返回学习大厅</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fb] pb-24">
            <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><ChevronLeft size={24} /></button>
                    <h1 className="text-lg font-bold text-slate-800">{title}</h1>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-mono font-bold flex items-center gap-2">
                    <Clock size={16} /> 倒计时 45:00
                </div>
            </header>

            <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
                {questions.map((q: any, idx: number) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 group hover:border-blue-200 transition-all">
                        <div className="flex gap-4 items-center">
                            <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{idx + 1}</span>
                            <span className="text-lg font-bold text-slate-800">{q.content || q.text}</span>
                        </div>
                        <div className="space-y-3">
                            {(q.options || ['正确', '错误']).map((option: any, i: number) => {
                                const isSelected = currentAnswers[idx] === option;
                                return (
                                    <label key={i} className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' : 'border-slate-100 hover:bg-slate-50'}`}
                                        onClick={() => setCurrentAnswers({ ...currentAnswers, [idx]: option })}>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>{option}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-8 py-5 flex justify-between items-center z-20 shadow-[0_-4px_20_rgba(0,0,0,0.03)]">
                <div className="text-sm text-slate-500">已回答 <span className="font-bold text-blue-600 text-lg">{Object.keys(currentAnswers).length}</span> / {questions.length} 题</div>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                    {isSubmitting ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
                    {isSubmitting ? '提交中...' : '提交试卷'}
                </button>
            </footer>
        </div>
    );
};
