import { useState } from "react";
import { useLogin } from "../Hooks/auth.hook";

const Login = () => {

    const [form, setForm] = useState({ userName: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const login = useLogin()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = () => login( form )

    return (

        <div className="min-h-screen flex flex-col lg:flex-row font-sans" style={{ fontFamily: "'Nunito', sans-serif" }}>

            {/* ── Left Panel ── */}
            <div
                className="hidden lg:flex lg:w-1/2 xl:w-2.5/5 relative flex-col justify-between p-12 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a4f8a 0%, #1565c0 45%, #0d47a1 100%)" }}
            >

                {/* Logo */}
                {/* <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}>
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.96.5 13.34.5c-1.3 0-2.48.55-3.34 1.44A4.825 4.825 0 006.66.5C4.04.5 2 2.54 2 4.66c0 .46.11.9.18 1.34H0v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM13.34 2.5c1.21 0 2.16.89 2.16 2.16 0 .41-.13.8-.31 1.34h-3.87A3.13 3.13 0 0111 4.66c0-1.27.95-2.16 2.16-2.16zm-6.68 0C7.87 2.5 8.82 3.39 8.82 4.66c0 .41-.13.8-.31 1.34H4.64A3.13 3.13 0 014.33 4.66C4.33 3.39 5.28 2.5 6.66 2.5zM11 20H2v-5h9v5zm0-7H2V9h9v4zm11 7h-9v-5h9v5zm0-7h-9V9h9v4z" />
                            </svg>
                        </div>
                        <span className="text-white text-2xl font-bold tracking-wide">Job<span style={{ color: "#64b5f6" }}>Pro</span></span>
                    </div>
                </div> */}

                {/* Hero Copy */}
                <div className="relative z-10 my-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                        style={{ background: "rgba(100,181,246,0.2)", color: "#90caf9", border: "1px solid rgba(100,181,246,0.3)" }}>
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
                        Over 50,000 active listings
                    </div>
                    <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-5">
                        Find Your <br />
                        <span style={{ color: "#64b5f6" }}>Dream Career</span><br />
                        Today.
                    </h1>
                    <p className="text-blue-200 text-lg leading-relaxed max-w-sm">
                        Connect with top employers, discover opportunities that match your skills, and take the next big step.
                    </p>

                    {/* Stats Row */}
                    <div className="flex gap-8 mt-10">
                        {[["50K+", "Job Listings"], ["12K+", "Companies"], ["2M+", "Candidates"]].map(([num, label]) => (
                            <div key={label}>
                                <p className="text-white text-2xl font-black">{num}</p>
                                <p className="text-blue-300 text-xs mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom Brand */}
                <div className="relative z-10 text-blue-400 text-xs">
                    © 2026 JobPro. All rights reserved.
                </div>
            </div>

            {/* ── Right Panel (Login Form) ── */}
            <div className="flex-1 flex flex-col min-h-screen bg-gray-50">

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-12 xl:px-20">

                    <div className="w-full max-w-md">

                        {/* Heading */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-800">Login</h2>
                            <p className="text-gray-500 mt-2 text-sm">Sign in to continue your job search journey.</p>
                        </div>

                        {/* Social Logins */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {[
                                {
                                    name: "Google", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: "LinkedIn", icon: (
                                        <svg className="w-4 h-4" fill="#0077B5" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    )
                                }
                            ].map(({ name, icon }) => (
                                <button
                                    key={name}
                                    className="flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium text-gray-600 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                    style={{ background: "#fff", borderColor: "#dce3ef" }}
                                >
                                    {icon}
                                    {name}
                                </button>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Username Field */}
                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">User name</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    name="userName"
                                    value={form.userName}
                                    onChange={handleChange}
                                    placeholder="B24CSB78"
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all border"
                                    style={{ background: "#f8fafc", borderColor: form.userName ? "#1565c0" : "#dce3ef", boxShadow: form.email ? "0 0 0 3px rgba(21,101,192,0.1)" : "none" }}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-semibold text-gray-700">Password</label>
                                <a href="#" className="text-xs font-medium" style={{ color: "#1565c0" }}>Forgot password?</a>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all border"
                                    style={{ background: "#f8fafc", borderColor: form.password ? "#1565c0" : "#dce3ef", boxShadow: form.password ? "0 0 0 3px rgba(21,101,192,0.1)" : "none" }}
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword
                                        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" /></svg>
                                        : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                            style={{ background: "linear-gradient(135deg, #1565c0, #1a4f8a)", boxShadow: "0 6px 20px rgba(21,101,192,0.4)" }}
                        >
                            <>
                                Sign In
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login