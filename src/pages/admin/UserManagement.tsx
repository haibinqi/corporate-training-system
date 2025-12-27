import React from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

export const UserManagement: React.FC = () => {
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all">
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
                    <tbody className="divide-y divide-slate-100">
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
                                <td className="px-6 py-4 text-slate-400">
                                    <button className="hover:text-blue-600 transition-colors"><MoreHorizontal size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
