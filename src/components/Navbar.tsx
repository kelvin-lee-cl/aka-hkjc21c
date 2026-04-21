import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Navbar.css'
import logoAKA from '../assets/logo_aka.png'

export default function Navbar() {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

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
                <button
                    type="button"
                    className="navbar__menu-btn"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                    ☰
                </button>
            </div>
            {isMobileMenuOpen && (
                <div className="navbar__mobile-menu">
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>主頁</NavLink>
                    <NavLink to="/works" className={({ isActive }) => isActive ? 'active' : ''}>學生作品</NavLink>
                    <NavLink to="/apply" className={({ isActive }) => isActive ? 'active' : ''}>報名參加</NavLink>
                </div>
            )}
        </nav>
    )
}


