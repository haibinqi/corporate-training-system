import React, { useState, useEffect } from 'react';
import { ClipboardList, History, LogOut, Clock, ArrowRight, CheckCircle2, ChevronRight, BookOpen, FileText, ExternalLink, PlayCircle, RefreshCw } from 'lucide-react';
import { TakeExam } from './TakeExam';
import { api } from '../../services/api';

type StudentView = 'exams' | 'history' | 'taking' | 'courses';

export const StudentDashboard: React.FC<{ user: { id: string, name: string }, onLogout: () => void }> = ({ user, onLogout }) => {
    const [view, setView] = useState<StudentView>('exams');
    const [assignments, setAssignments] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentExam, setCurrentExam] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [examData, courseData] = await Promise.all([
                api.getStudentExams(user.id),
                api.getCourses()
            ]);
            setAssignments(examData);
            setCourses(courseData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (view === 'taking' && currentExam) {
        return (
            <TakeExam
                assignmentId={currentExam.assignment_id}
                examId={currentExam.exam_id}
                title={currentExam.title}
                questions={typeof currentExam.questions === 'string' ? JSON.parse(currentExam.questions) : currentExam.questions}
                userId={user.id}
                onBack={() => {
                    setView('exams');
                    fetchData();
                }}
            />
        );
    }

    const renderContent = () => {
        if (view === 'exams') {
            return (
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            待参加考试
                            {loading && <RefreshCw className="animate-spin text-blue-500 ml-2" size={18} />}
                        </h2>

                        {assignments.length === 0 && !loading ? (
                            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center">
                                <p className="text-slate-400 font-medium">暂无待参加的考核任务</p>
                            </div>
                        ) : (
                            assignments.map(a => (
                                <ExamCard
                                    key={a.assignment_id}
                                    title={a.title}
                                    course="相关合规课程"
                                    duration="45分钟"
                                    questions={`${(typeof a.questions === 'string' ? JSON.parse(a.questions) : a.questions)?.length || 0}题`}
                                    deadline={new Date(a.assigned_at + 86400000 * 7).toLocaleDateString()}
                                    onTake={() => {
                                        setCurrentExam(a);
                                        setView('taking');
                                    }}
                                />
                            ))
                        )}
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
                                    <p className="text-2xl font-black text-slate-800">{12 - assignments.length}</p>
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

        if (view === 'courses') {
            return (
                <div className="max-w-6xl mx-auto space-y-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                        课程资料库
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(c => (
                            <CourseSimpleCard key={c.id} title={c.title} type={c.content_type} date={new Date(c.created_at).toLocaleDateString()} />
                        ))}
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
                    <div className="p-12 text-center text-slate-400 font-medium">
                        记录拉取中...
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f7fa] flex flex-col">
            <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                        <ClipboardList size={20} />
                    </div>
                    <span className="font-bold text-lg text-slate-800">学员考试中心</span>
                </div>

                <nav className="flex items-center gap-8">
                    <button onClick={() => setView('exams')} className={`font-bold flex items-center gap-2 transition-colors ${view === 'exams' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><ClipboardList size={18} /> 待参加考试</button>
                    <button onClick={() => setView('courses')} className={`font-bold flex items-center gap-2 transition-colors ${view === 'courses' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><BookOpen size={18} /> 课程学习</button>
                    <button onClick={() => setView('history')} className={`font-bold flex items-center gap-2 transition-colors ${view === 'history' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><History size={18} /> 个人历史记录</button>
                </nav>

                <div className="flex items-center gap-4 border-l pl-8">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-[12px] text-slate-400">学号: STU{user.id.toUpperCase()}</p>
                    </div>
                    <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><LogOut size={20} /></button>
                </div>
            </header>

            {view === 'exams' && (
                <div className="bg-blue-600 text-white py-12 px-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-black mb-2">你好，{user.name}</h1>
                        <p className="opacity-80">你有 {assignments.length} 门待参加的合规性考核，请及时完成。</p>
                    </div>
                </div>
            )}

            <main className={`flex-1 p-8 ${view === 'exams' ? '-mt-6' : 'mt-4'}`}>
                {renderContent()}
            </main>
        </div>
    );
};

const ExamCard = ({ title, course, duration, questions, deadline, onTake }: any) => (
    <div onClick={onTake} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer">
        <div className="flex justify-between items-start">
            <div className="space-y-4 flex-1">
                <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">PENDING</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-2 group-hover:text-blue-600 transition-colors">{title}</h3>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-300" /> {duration}</span>
                    <span className="flex items-center gap-1.5"><ClipboardList size={16} className="text-slate-300" /> {questions}</span>
                    <span className="text-red-400 font-medium">截止日期: {deadline}</span>
                </div>
            </div>
            <div className="bg-slate-50 text-slate-400 p-4 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <ArrowRight size={24} />
            </div>
        </div>
    </div>
);

const HistoryItem = ({ title, score, date, attempt }: any) => (
    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center"><CheckCircle2 size={24} /></div>
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

const CourseSimpleCard = ({ title, type, date }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${type === 'FILE' ? 'bg-red-50 text-red-600' : type === 'LINK' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {type === 'FILE' ? <FileText size={20} /> : type === 'LINK' ? <ExternalLink size={20} /> : <PlayCircle size={20} />}
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{type} · {date}</p>
            </div>
        </div>
        <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
            开始学习 <ArrowRight size={14} />
        </button>
    </div>
);
