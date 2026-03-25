import { useState } from "react";
import { useSelector } from "react-redux";
import { useLogout } from "../Hooks/auth.hook";
import { useNavigate } from "react-router-dom";

const Logo = () => (

    <div className="flex items-center gap-2.5">
        <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)" }}
        >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.96.5 13.34.5c-1.3 0-2.48.55-3.34 1.44A4.825 4.825 0 006.66.5C4.04.5 2 2.54 2 4.66c0 .46.11.9.18 1.34H0v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM11 20H2v-5h9v5zm0-7H2V9h9v4zm11 7h-9v-5h9v5zm0-7h-9V9h9v4z" />
            </svg>
        </div>
        <span className="text-white text-xl font-extrabold tracking-wide">
            Job<span style={{ color: "#64b5f6" }}>Pro</span>
        </span>
    </div>

);

const navLinks = [

    { label: "Find Jobs", badge: "50K+" },
    { label: "Companies" },
    { label: "Candidates" },
    { label: "Blog" },
    { label: "About" },

];

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Find Jobs");
    const [scrolled] = useState(false);

    const { isAuthenticated } = useSelector( state => state.auth )
    const navigate = useNavigate()
    const logout = useLogout()
    const handleAuth = () => {

        if( isAuthenticated ) logout()
        else navigate('/login')

    }

    return (
        
        <div style={{ fontFamily: "'Nunito', sans-serif" }}>

            {/* ── Main Navbar ── */}
            <nav
                className="w-full relative z-50 transition-all duration-300"
                style={{
                    background: scrolled
                        ? "rgba(13,71,161,0.97)"
                        : "linear-gradient(135deg, #1a4f8a 0%, #1565c0 60%, #0d47a1 100%)",
                    boxShadow: "0 4px 24px rgba(13,71,161,0.25)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-18">

                        {/* Logo */}
                        <Logo />

                        {/* Desktop Nav Links */}
                        <ul className="hidden lg:flex items-center gap-1">
                            {navLinks.map(({ label, badge }) => (
                                <li key={label}>
                                    <button
                                        onClick={() => setActiveLink(label)}
                                        className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                                        style={{
                                            color: activeLink === label ? "#fff" : "rgba(255,255,255,0.72)",
                                            background: activeLink === label ? "rgba(255,255,255,0.15)" : "transparent",
                                        }}
                                    >
                                        {label}
                                        {badge && (
                                            <span
                                                className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                                                style={{ background: "rgba(100,181,246,0.25)", color: "#90caf9", fontSize: "10px" }}
                                            >
                                                {badge}
                                            </span>
                                        )}
                                        {activeLink === label && (
                                            <span
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                                style={{ background: "#64b5f6" }}
                                            />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Post a Job */}
                            <button
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                                style={{
                                    background: "rgba(255,255,255,0.12)",
                                    color: "#fff",
                                    border: "1px solid rgba(255,255,255,0.22)",
                                }}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                Post a Job
                            </button>

                            {/* Sign In */}
                            <button
                                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                                style={{ color: "rgba(255,255,255,0.85)", background: "transparent" }}
                                onClick={ handleAuth }
                            >{ isAuthenticated ? 'Logout' : 'Login' }</button>

                            {/* Register */}
                            <button
                                className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                                style={{
                                    background: "#fff",
                                    color: "#1565c0",
                                    boxShadow: "0 4px 14px rgba(255,255,255,0.2)",
                                }}
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-all"
                            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span
                                className="block h-0.5 w-5 bg-white rounded-full transition-all duration-300"
                                style={{ transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }}
                            />
                            <span
                                className="block h-0.5 w-5 bg-white rounded-full transition-all duration-300"
                                style={{ opacity: menuOpen ? 0 : 1 }}
                            />
                            <span
                                className="block h-0.5 w-5 bg-white rounded-full transition-all duration-300"
                                style={{ transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }}
                            />
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                <div
                    className="lg:hidden overflow-hidden transition-all duration-300"
                    style={{
                        maxHeight: menuOpen ? "420px" : "0px",
                        background: "rgba(13,55,130,0.98)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div className="px-4 py-4 space-y-1 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                        {navLinks.map(({ label, badge }) => (
                            <button
                                key={label}
                                onClick={() => { setActiveLink(label); setMenuOpen(false); }}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all"
                                style={{
                                    color: activeLink === label ? "#fff" : "rgba(255,255,255,0.7)",
                                    background: activeLink === label ? "rgba(255,255,255,0.12)" : "transparent",
                                }}
                            >
                                <span>{label}</span>
                                {badge && (
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full"
                                        style={{ background: "rgba(100,181,246,0.2)", color: "#90caf9" }}
                                    >
                                        {badge}
                                    </span>
                                )}
                            </button>
                        ))}
                        <div className="pt-3 pb-1 grid grid-cols-2 gap-2 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                            <button
                                className="py-2.5 rounded-xl text-sm font-semibold text-center transition-all"
                                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}
                            >
                                Sign In
                            </button>
                            <button
                                className="py-2.5 rounded-xl text-sm font-bold text-center transition-all"
                                style={{ background: "#fff", color: "#1565c0" }}
                            >
                                Get Started
                            </button>
                        </div>
                        <button
                            className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-1 transition-all"
                            style={{ background: "rgba(100,181,246,0.15)", color: "#90caf9", border: "1px solid rgba(100,181,246,0.25)" }}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Post a Job
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;