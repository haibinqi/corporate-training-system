import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit2, ShieldAlert, UserMinus, X } from 'lucide-react';

export const UserManagement: React.FC = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const users = [
        { id: '1', name: '张三', account: 'zhangsan', role: 'STUDENT', status: 'ACTIVE', joinDate: '2023-10-01' },
        { id: '2', name: '李四', account: 'lisi', role: 'ADMIN', status: 'ACTIVE', joinDate: '2023-09-15' },
        { id: '3', name: '王五', account: 'wangwu', role: 'STUDENT', status: 'FROZEN', joinDate: '2023-08-20' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">账号管理</h2>
                    <p className="text-slate-500 text-sm">管理系统用户及其权限状态</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    <Plus size={18} /> 手动创建账号
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="搜索姓名或账号..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition-all text-sm"
                        />
                    </div>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 text-slate-600 hover:bg-slate-50 text-sm">
                        <Filter size={18} /> 筛选
                    </button>
                </div>

                <div className="overflow-x-auto overflow-y-visible">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">姓名</th>
                                <th className="px-6 py-4 font-bold">账号</th>
                                <th className="px-6 py-4 font-bold">角色</th>
                                <th className="px-6 py-4 font-bold">状态</th>
                                <th className="px-6 py-4 font-bold">创建时间</th>
                                <th className="px-6 py-4 font-bold">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 mb-20">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{user.account}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'ACTIVE' ? 'bg-green-50 text-green-600' :
                                            user.status === 'FROZEN' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-400'
                                            }`}>
                                            {user.status === 'ACTIVE' ? '在职' : user.status === 'FROZEN' ? '冻结' : '离职'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{user.joinDate}</td>
                                    <td className="px-6 py-4 text-slate-400 relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenu(openMenu === user.id ? null : user.id);
                                            }}
                                            className="hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-100"
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>

                                        {openMenu === user.id && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-20"
                                                    onClick={() => setOpenMenu(null)}
                                                ></div>
                                                <div className="absolute right-6 top-14 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in zoom-in duration-200">
                                                    <MenuAction icon={<Edit2 size={14} />} label="编辑信息" onClick={() => setOpenMenu(null)} />
                                                    <MenuAction icon={<ShieldAlert size={14} />} label="权限设置" onClick={() => setOpenMenu(null)} />
                                                    <div className="h-px bg-slate-50 my-1"></div>
                                                    <MenuAction icon={<UserMinus size={14} />} label="离职/删除" danger onClick={() => setOpenMenu(null)} />
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreateModal(false)}></div>
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-60 overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-300">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">手动创建账号</h3>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setShowCreateModal(false); }}>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">姓名</label>
                                <input type="text" placeholder="输入真实姓名" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">账号</label>
                                <input type="text" placeholder="输入系统登入账号" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">初始密码</label>
                                    <input type="password" placeholder="******" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">角色</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all">
                                        <option value="STUDENT">普通学员</option>
                                        <option value="ADMIN">管理员</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">取消</button>
                                <button type="submit" className="flex-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                    立即创建
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const MenuAction = ({ icon, label, onClick, danger = false }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-4 py-2 text-sm font-medium transition-colors ${danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-600 hover:bg-slate-50'
            }`}
    >
        {icon}
        {label}
    </button>
);
