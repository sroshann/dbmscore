const Footer = () => {

    const footerLinks = {
        "For Job Seekers": ["Browse Jobs", "Browse Companies", "Salary Explorer", "Career Advice", "Resume Builder", "Job Alerts"],
        "For Employers": ["Post a Job", "Browse Candidates", "Pricing Plans", "Recruiter Tools", "Employer Blog", "HR Resources"],
        "Company": ["About Us", "Our Team", "Press & Media", "Careers at JobPro", "Partner with Us", "Contact Us"],
        "Support": ["Help Center", "Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Sitemap"],
    };

    const socials = [
        {
            label: "LinkedIn",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            label: "Twitter/X",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            label: "Facebook",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            label: "Instagram",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            ),
        },
    ];

    return (

        <footer style={{ fontFamily: "'Nunito', sans-serif", background: "linear-gradient(180deg, #0f3770 0%, #0a2a56 60%, #071e3d 100%)" }}>
            
            {/* Decorative Blobs */}
            <div className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-5"
                    style={{ background: "radial-gradient(circle, #64b5f6 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-5"
                    style={{ background: "radial-gradient(circle, #42a5f5 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                {/* ── Newsletter Banner ── */}
                <div
                    className="relative mx-4 sm:mx-8 lg:mx-16 xl:mx-24 -mt-px rounded-2xl px-6 py-8 sm:px-10 sm:py-10 mb-16 mt-12"
                    style={{ background: "linear-gradient(135deg, #1565c0, #1a4f8a)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(13,71,161,0.4)" }}
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                                style={{ background: "rgba(100,181,246,0.2)", color: "#90caf9", border: "1px solid rgba(100,181,246,0.3)" }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                Weekly Job Digest
                            </div>
                            <h3 className="text-white text-xl sm:text-2xl font-extrabold">Get the best jobs delivered to your inbox</h3>
                            <p className="text-blue-200 text-sm mt-1">Join 200,000+ professionals who receive our weekly digest.</p>
                        </div>
                        <div className="flex w-full lg:w-auto gap-2 flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 lg:w-72 px-4 py-3 rounded-xl text-sm outline-none text-gray-700"
                                style={{ background: "#fff", border: "none" }}
                            />
                            <button
                                className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                                style={{ background: "linear-gradient(135deg, #42a5f5, #1565c0)", boxShadow: "0 4px 14px rgba(66,165,245,0.4)" }}
                            >
                                Subscribe Free →
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Main Footer Grid ── */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

                        {/* Brand Column */}
                        <div className="sm:col-span-2 lg:col-span-2">
                            {/* Logo */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.96.5 13.34.5c-1.3 0-2.48.55-3.34 1.44A4.825 4.825 0 006.66.5C4.04.5 2 2.54 2 4.66c0 .46.11.9.18 1.34H0v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM11 20H2v-5h9v5zm0-7H2V9h9v4zm11 7h-9v-5h9v5zm0-7h-9V9h9v4z" />
                                    </svg>
                                </div>
                                <span className="text-white text-xl font-extrabold tracking-wide">Job<span style={{ color: "#64b5f6" }}>Pro</span></span>
                            </div>

                            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                                The smartest way to find and fill jobs. Connecting top talent with world-class companies since 2019.
                            </p>

                            {/* Stats Pills */}
                            <div className="flex flex-wrap gap-2 mb-7">
                                {[["50K+", "Jobs"], ["12K+", "Companies"], ["2M+", "Users"]].map(([n, l]) => (
                                    <div key={l} className="px-3 py-1.5 rounded-lg text-center"
                                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                        <p className="text-white text-sm font-black">{n}</p>
                                        <p className="text-xs" style={{ color: "#90caf9" }}>{l}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Socials */}
                            <div className="flex gap-2">
                                {socials.map(({ label, icon }) => (
                                    <button
                                        key={label}
                                        aria-label={label}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-md"
                                        style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([heading, links]) => (
                            <div key={heading}>
                                <h4 className="text-white text-sm font-bold mb-4 tracking-wide uppercase" style={{ letterSpacing: "0.06em" }}>
                                    {heading}
                                </h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm transition-all hover:translate-x-0.5 inline-block"
                                                style={{ color: "rgba(255,255,255,0.5)" }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = "#90caf9")}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* ── Bottom Bar ── */}
                <div
                    className="relative border-t"
                    style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                            © 2026 JobPro, Inc. All rights reserved. Made with ❤️ for job seekers everywhere.
                        </p>
                        <div className="flex items-center gap-4">
                            {["Privacy", "Terms", "Cookies", "Accessibility"].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-xs transition-colors"
                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#90caf9")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;