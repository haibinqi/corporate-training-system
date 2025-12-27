import React, { useState } from 'react'
import { Login } from './pages/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { StudentDashboard } from './pages/student/Dashboard'

function App() {
    const [user, setUser] = useState<{ role: string, id: string } | null>(null);

    if (!user) {
        return <Login onLogin={(u) => setUser(u)} />
    }

    // Handle role-based routing
    if (user.role === 'ADMIN') {
        return <AdminDashboard />
    }

    if (user.role === 'STUDENT') {
        return <StudentDashboard />
    }

    return <div>Role Error</div>
}

export default App
