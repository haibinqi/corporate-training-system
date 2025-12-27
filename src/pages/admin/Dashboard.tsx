import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    ClipboardList,
    LogOut
} from 'lucide-react';
import { UserManagement } from './UserManagement';
import { CourseManagement } from './CourseManagement';
import { ExamManagement } from './ExamManagement';
import { ExamRecords } from './ExamRecords';

type AdminView = 'dashboard' | 'users' | 'courses' | 'exams' | 'records';

export const AdminDashboard: React.FC = () => {
    const [currentView, setCurrentView] = useState<AdminView>('dashboard');

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return (
                    <div className="p-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard label="待完成考试人数" value="124" trend="+12 new today" color="orange" />
                            <StatCard label="已完成考试人数" value="856" trend="98% completion rate" color="green" />
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="text-blue-600">⚡</span> 快捷操作
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ActionCard onClick={() => setCurrentView('exams')} icon={<FileText color="white" />} label="新建考试" color="bg-blue-600" />
                                <ActionCard onClick={() => setCurrentView('courses')} icon={<BookOpen color="white" />} label="新建课程" color="bg-purple-600" />
                                <ActionCard onClick={() => setCurrentView('users')} icon={<Users color="white" />} label="新建账号" color="bg-emerald-600" />
                            </div>
                        </div>
                    </div>
                );
            case 'users':
                return <div className="p-8"><UserManagement /></div>;
            case 'courses':
                return <div className="p-8"><CourseManagement /></div>;
            case 'exams':
                return <div className="p-8"><ExamManagement /></div>;
            case 'records':
                return <div className="p-8"><ExamRecords /></div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                        <LayoutDashboard size={20} />
                    </div>
                    <span className="font-bold text-lg">Admin Portal</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <MenuItem
                        onClick={() => setCurrentView('dashboard')}
                        icon={<LayoutDashboard size={18} />}
                        label="仪表盘"
                        active={currentView === 'dashboard'}
                    />
                    <MenuItem
                        onClick={() => setCurrentView('users')}
                        icon={<Users size={18} />}
                        label="账号管理"
                        active={currentView === 'users'}
                    />
                    <MenuItem
                        onClick={() => setCurrentView('courses')}
                        icon={<BookOpen size={18} />}
                        label="课程管理"
                        active={currentView === 'courses'}
                    />
                    <MenuItem
                        onClick={() => setCurrentView('exams')}
                        icon={<FileText size={18} />}
                        label="考试管理"
                        active={currentView === 'exams'}
                    />
                    <MenuItem
                        onClick={() => setCurrentView('records')}
                        icon={<ClipboardList size={18} />}
                        label="考试记录与统计"
                        active={currentView === 'records'}
                    />
                </nav>

                <div className="p-4 border-t">
                    <button onClick={() => window.location.reload()} className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-slate-800">
                        {currentView === 'dashboard' ? '欢迎回来，管理员' :
                            currentView === 'users' ? '账号管理中心' :
                                currentView === 'courses' ? '课程资料库' :
                                    currentView === 'exams' ? '考试分发系统' : '考试统计与留痕'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold">Today: Oct 24, 2023</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

const MenuItem = ({ icon, label, active = false, onClick }: any) => (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100'
        }`}>
        {icon}
        <span>{label}</span>
    </button>
);

const StatCard = ({ label, value, trend, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-slate-500 text-sm mb-2">{label}</div>
        <div className="text-3xl font-black mb-4">{value}</div>
        <div className={`text-[12px] px-2 py-1 rounded bg-${color}-50 text-${color}-600 inline-block`}>{trend}</div>
    </div>
);

const ActionCard = ({ icon, label, color, onClick }: any) => (
    <div onClick={onClick} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
            {icon}
        </div>
        <span className="font-bold text-slate-800">{label}</span>
    </div>
);
