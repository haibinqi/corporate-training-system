import React, { useState } from 'react'
import { Login } from './pages/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { StudentDashboard } from './pages/student/Dashboard'

function App() {
    const [user, setUser] = useState<{ role: string, id: string, name: string } | null>(null);

    if (!user) {
        return <Login onLogin={(u) => setUser(u)} />
    }

    const handleLogout = () => setUser(null);

    // Handle role-based routing
    if (user.role === 'ADMIN') {
        return <AdminDashboard user={user} onLogout={handleLogout} />
    }

    if (user.role === 'STUDENT') {
        return <StudentDashboard user={user} onLogout={handleLogout} />
    }

    return <div>Role Error</div>
}

export default App
