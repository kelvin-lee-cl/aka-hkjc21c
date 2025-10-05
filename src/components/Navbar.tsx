import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, googleProvider } from '../firebase'
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import './Navbar.css'

export default function Navbar() {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
        return () => unsub()
    }, [])

    const handleLogin = async () => {
        await signInWithPopup(auth, googleProvider)
    }

    const handleLogout = async () => {
        await signOut(auth)
    }

    return (
        <nav className="navbar">
            <div className="navbar__inner">
                <div className="navbar__left">
                    <Link to="/" className="navbar__logo">
                        AKA
                    </Link>
                    <div className="navbar__links">
                        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>主頁</NavLink>
                        <NavLink to="/works" className={({ isActive }) => isActive ? 'active' : ''}>學生作品</NavLink>
                        <NavLink to="/apply" className={({ isActive }) => isActive ? 'active' : ''}>報名參加</NavLink>
                    </div>
                </div>
                <div className="navbar__right">
                    {currentUser ? (
                        <button onClick={handleLogout} className="btn">登出</button>
                    ) : (
                        <button onClick={handleLogin} className="btn">登入</button>
                    )}
                </div>
            </div>
        </nav>
    )
}


