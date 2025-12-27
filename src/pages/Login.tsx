import React, { useState } from 'react';
import { User, Lock, ShieldCheck } from 'lucide-react';

interface LoginProps {
    onLogin: (user: { role: string; id: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // For demo, if account contains 'admin' -> ADMIN, else STUDENT
            const role = account.toLowerCase().includes('admin') ? 'ADMIN' : 'STUDENT';
            onLogin({ role, id: account });
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen w-full bg-[#f4f7fa] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="h-1.5 w-full bg-blue-600" />

                <div className="p-10 pt-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-6">
                        <ShieldCheck size={32} />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-800 mb-2">企业培训合规管理平台</h1>
                    <p className="text-slate-500 text-sm mb-10">请输入账号密码登录系统</p>

                    <form onSubmit={handleLogin} className="space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">账号</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block p-4 pl-11 transition-all outline-none"
                                    placeholder="请输入账号"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">密码</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block p-4 pl-11 transition-all outline-none"
                                    placeholder="请输入密码"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : "登录"}
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-[12px]">
                        <ShieldCheck size={14} />
                        <span>安全加密连接 · 仅限内部访问</span>
                    </div>
                </div>
            </div>

            <p className="mt-12 text-slate-400 text-sm">
                © 2024 企业培训合规管理平台. All rights reserved.
            </p>
        </div>
    );
};
