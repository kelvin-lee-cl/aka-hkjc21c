import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Navbar.css'
import logoAKA from '../assets/logo_aka.png'

export default function Navbar() {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem('aka_is_admin') === 'true'
        setIsAdmin(saved)
    }, [])

    const handleLogin = () => {
        setShowModal(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('aka_is_admin')
        setIsAdmin(false)
        window.dispatchEvent(new Event('adminStateChange'))
    }

    const submitPassword = () => {
        if (password === 'AKA2025') {
            localStorage.setItem('aka_is_admin', 'true')
            setIsAdmin(true)
            setShowModal(false)
            setPassword('')
            window.dispatchEvent(new Event('adminStateChange'))
        } else {
            alert('密碼不正確')
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar__inner">
                <div className="navbar__left">
                    <a href="https://www.aka.org.hk/" target="_blank" rel="noreferrer" className="navbar__logo">
                        <img src={logoAKA} alt="AKA" />
                    </a>
                </div>
                <div className="navbar__center">
                    <div className="navbar__links">
                        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>主頁</NavLink>
                        <NavLink to="/works" className={({ isActive }) => isActive ? 'active' : ''}>學生作品</NavLink>
                        <NavLink to="/apply" className={({ isActive }) => isActive ? 'active' : ''}>報名參加</NavLink>
                    </div>
                </div>
                <div className="navbar__right">
                    {isAdmin ? (
                        <button onClick={handleLogout} className="btn">登出</button>
                    ) : (
                        <button onClick={handleLogin} className="btn">登入</button>
                    )}
                </div>
            </div>
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 8, width: 320 }}>
                        <h3 style={{ marginTop: 0, marginBottom: 12 }}>管理員登入</h3>
                        <input
                            type="password"
                            placeholder="輸入密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd' }}
                        />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                            <button onClick={() => { setShowModal(false); setPassword('') }} className="btn" style={{ background: '#999' }}>取消</button>
                            <button onClick={submitPassword} className="btn">登入</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}


