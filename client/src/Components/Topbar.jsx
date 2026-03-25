
const C = {
    darkest: "#071e3d",
    dark: "#0a2a56",
    main: "#1565c0",
    mid: "#1a4f8a",
    light: "#42a5f5",
    lighter: "#64b5f6",
    ghost: "#90caf9",
    sidebar: "#0d2d5e",
    sidebarActive: "#1565c0",
};

const Topbar = ({ title, subtitle, setSidebarOpen, children }) => (
    <header className="flex items-center gap-4 px-6 py-4 border-b bg-white"
        style={{ borderColor: "#e2e8f0", boxShadow: "0 2px 12px rgba(21,101,192,0.06)" }}>
        <button className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(21,101,192,0.08)", color: C.main }}
            onClick={() => setSidebarOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-gray-900 truncate">{title}</h1>
            {subtitle && <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">{children}</div>
    </header>
);

export default Topbar