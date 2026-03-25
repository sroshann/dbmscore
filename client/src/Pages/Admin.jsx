import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useGetAdmin } from "../Hooks/admin.hook";
import { useSelector } from "react-redux";

/* ── Design Tokens ── */
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

/* ── Initial Data ── */
const initStudents = [
    { id: 1, name: "Arjun Menon", email: "arjun@example.com", phone: "9876543210", course: "B.Tech CSE", year: "Final Year", cgpa: "8.9", status: "Active", avatar: "AM", joined: "Jan 2024" },
    { id: 2, name: "Priya Nair", email: "priya@example.com", phone: "9876543211", course: "MBA Finance", year: "2nd Year", cgpa: "9.1", status: "Active", avatar: "PN", joined: "Feb 2024" },
    { id: 3, name: "Rohit Kumar", email: "rohit@example.com", phone: "9876543212", course: "B.Tech ECE", year: "3rd Year", cgpa: "7.8", status: "Inactive", avatar: "RK", joined: "Mar 2024" },
    { id: 4, name: "Sneha Pillai", email: "sneha@example.com", phone: "9876543213", course: "BCA", year: "Final Year", cgpa: "8.5", status: "Active", avatar: "SP", joined: "Jan 2024" },
    { id: 5, name: "Vikram Das", email: "vikram@example.com", phone: "9876543214", course: "MCA", year: "1st Year", cgpa: "8.2", status: "Active", avatar: "VD", joined: "Apr 2024" },
];

const initCompanies = [
    { id: 1, name: "TechNova Solutions", industry: "Information Technology", email: "hr@technova.com", phone: "0484-2340001", size: "500-1000", location: "Bangalore", status: "Verified", logo: "TN", joined: "Dec 2023", jobs: 8 },
    { id: 2, name: "FinEdge Capital", industry: "Banking & Finance", email: "careers@finedge.com", phone: "0484-2340002", size: "1000-5000", location: "Mumbai", status: "Verified", logo: "FE", joined: "Nov 2023", jobs: 5 },
    { id: 3, name: "DesignCraft Studio", industry: "Creative & Design", email: "jobs@designcraft.com", phone: "0484-2340003", size: "50-200", location: "Kochi", status: "Pending", logo: "DC", joined: "Mar 2024", jobs: 3 },
    { id: 4, name: "CloudBase Inc.", industry: "Cloud & DevOps", email: "hr@cloudbase.io", phone: "0484-2340004", size: "200-500", location: "Hyderabad", status: "Verified", logo: "CB", joined: "Jan 2024", jobs: 12 },
    { id: 5, name: "MediCare Tech", industry: "Healthcare IT", email: "careers@medicare.tech", phone: "0484-2340005", size: "100-500", location: "Chennai", status: "Suspended", logo: "MT", joined: "Feb 2024", jobs: 2 },
];

const initJobRequests = [
    { id: 1, title: "Senior React Developer", company: "TechNova Solutions", logo: "TN", type: "Full-time", salary: "₹18-25 LPA", location: "Bangalore", deadline: "2026-04-30", skills: ["React", "TypeScript", "Node.js"], status: "Pending", posted: "2 hours ago", applicants: 0 },
    { id: 2, title: "Financial Analyst", company: "FinEdge Capital", logo: "FE", type: "Full-time", salary: "₹12-18 LPA", location: "Mumbai", deadline: "2026-05-15", skills: ["Excel", "Python", "Finance"], status: "Approved", posted: "1 day ago", applicants: 24 },
    { id: 3, title: "UI/UX Designer", company: "DesignCraft Studio", logo: "DC", type: "Contract", salary: "₹8-12 LPA", location: "Kochi", deadline: "2026-04-20", skills: ["Figma", "Adobe XD", "Prototyping"], status: "Pending", posted: "3 hours ago", applicants: 0 },
    { id: 4, title: "DevOps Engineer", company: "CloudBase Inc.", logo: "CB", type: "Full-time", salary: "₹20-30 LPA", location: "Hyderabad", deadline: "2026-05-01", skills: ["Kubernetes", "AWS", "Docker"], status: "Approved", posted: "2 days ago", applicants: 37 },
    { id: 5, title: "Product Manager", company: "TechNova Solutions", logo: "TN", type: "Full-time", salary: "₹22-32 LPA", location: "Remote", deadline: "2026-05-20", skills: ["Product Strategy", "Agile", "Analytics"], status: "Rejected", posted: "1 day ago", applicants: 0 },
    { id: 6, title: "Data Analyst", company: "CloudBase Inc.", logo: "CB", type: "Internship", salary: "₹40k/mo", location: "Hyderabad", deadline: "2026-04-25", skills: ["SQL", "Python", "Tableau"], status: "Pending", posted: "5 hours ago", applicants: 0 },
];

/* ── Helpers ── */
const statusBadge = (s) => {
    const map = {
        Active: { bg: "rgba(16,185,129,0.1)", color: "#10b981", dot: "#10b981" },
        Inactive: { bg: "rgba(148,163,184,0.1)", color: "#94a3b8", dot: "#94a3b8" },
        Verified: { bg: "rgba(21,101,192,0.1)", color: C.main, dot: C.main },
        Pending: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", dot: "#f59e0b" },
        Approved: { bg: "rgba(16,185,129,0.1)", color: "#10b981", dot: "#10b981" },
        Rejected: { bg: "rgba(239,68,68,0.1)", color: "#ef4444", dot: "#ef4444" },
        Suspended: { bg: "rgba(239,68,68,0.1)", color: "#ef4444", dot: "#ef4444" },
    };
    const t = map[s] || map.Pending;
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: t.bg, color: t.color }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: t.dot }} />
            {s}
        </span>
    );
};

const avatarColors = ["#1565c0", "#7c3aed", "#10b981", "#f59e0b", "#ef4444", "#0ea5e9", "#8b5cf6", "#06b6d4"];
const avatarColor = (str) => avatarColors[str.charCodeAt(0) % avatarColors.length];

/* ══════════════════════════════════════
   ADD COMPANY FORM
══════════════════════════════════════ */
const AddCompanyForm = ({ onAdd, onClose }) => {
    const [form, setForm] = useState({ name: "", industry: "", email: "", phone: "", size: "", location: "" });
    const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...form, id: Date.now(), status: "Pending", logo: form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), joined: "Now", jobs: 0 });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Input label="Company Name" value={form.name} onChange={f("name")} placeholder="e.g. TechNova Solutions" required /></div>
                <Select label="Industry" value={form.industry} onChange={f("industry")} options={["Information Technology", "Banking & Finance", "Creative & Design", "Cloud & DevOps", "Healthcare IT", "E-Commerce", "Manufacturing", "Education"]} required />
                <Select label="Company Size" value={form.size} onChange={f("size")} options={["1-50", "50-200", "200-500", "500-1000", "1000-5000", "5000+"]} required />
                <Input label="HR Email" type="email" value={form.email} onChange={f("email")} placeholder="hr@company.com" required />
                <Input label="Phone" value={form.phone} onChange={f("phone")} placeholder="0484-2340001" required />
                <div className="col-span-2"><Input label="Location" value={form.location} onChange={f("location")} placeholder="e.g. Bangalore, Karnataka" required /></div>
            </div>
            <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "#f1f5f9", color: "#64748b" }}>Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg,${C.main},${C.mid})`, boxShadow: `0 6px 20px rgba(21,101,192,0.35)` }}>
                    Add Company
                </button>
            </div>
        </form>
    );
};

/* ══════════════════════════════════════
   DASHBOARD PAGE
══════════════════════════════════════ */
const Dashboard = ({ students, companies, jobRequests, setPage }) => {
    const stats = [
        { label: "Total Students", value: students.length, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: C.main, bg: "rgba(21,101,192,0.1)", trend: "+12%", action: "students" },
        { label: "Registered Companies", value: companies.length, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "#7c3aed", bg: "rgba(124,58,237,0.1)", trend: "+5%", action: "companies" },
        { label: "Pending Job Requests", value: jobRequests.filter(j => j.status === "Pending").length, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", trend: "Needs review", action: "job-requests" },
        { label: "Approved Jobs", value: jobRequests.filter(j => j.status === "Approved").length, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "#10b981", bg: "rgba(16,185,129,0.1)", trend: "Live now", action: "job-requests" },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Welcome banner */}
            <div className="relative rounded-2xl px-8 py-8 overflow-hidden"
                style={{ background: `linear-gradient(135deg,${C.mid} 0%,${C.main} 60%,${C.dark} 100%)` }}>
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle,${C.lighter} 0%,transparent 70%)`, transform: "translate(30%,-30%)" }} />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                            style={{ background: "rgba(100,181,246,0.2)", color: C.ghost, border: "1px solid rgba(100,181,246,0.3)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                            Admin Portal — Live
                        </div>
                        <h2 className="text-white text-2xl font-extrabold mb-1">Good morning, Admin 👋</h2>
                        <p className="text-blue-200 text-sm">Here's what's happening with your job portal today.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setPage("students")} className="px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5"
                            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                            + Add Student
                        </button>
                        <button onClick={() => setPage("companies")} className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
                            style={{ background: "#fff", color: C.main }}>
                            + Add Company
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <button key={i} onClick={() => setPage(s.action)}
                        className="p-5 rounded-2xl text-left group transition-all hover:-translate-y-1"
                        style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(21,101,192,0.12)"; e.currentTarget.style.borderColor = C.lighter; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                                <svg className="w-5 h-5" style={{ color: s.color }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    {s.icon.split(" M").map((d, j) => <path key={j} d={j === 0 ? d : "M" + d} />)}
                                </svg>
                            </div>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{s.trend}</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900 mb-0.5">{s.value}</p>
                        <p className="text-xs font-semibold text-gray-500">{s.label}</p>
                    </button>
                ))}
            </div>
        
        </div>
    );
};


/* ══════════════════════════════════════
   COMPANIES PAGE
══════════════════════════════════════ */
const CompaniesPage = ({ companies, setCompanies, showToast }) => {
    const [modal, setModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filtered = companies.filter(c =>
        (filter === "All" || c.status === filter) &&
        (c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase()))
    );

    const handleAdd = (company) => { setCompanies(p => [company, ...p]); showToast("Company added successfully!", "success"); };
    const handleDelete = () => { setCompanies(p => p.filter(c => c.id !== deleteTarget.id)); setDeleteTarget(null); showToast("Company removed.", "info"); };
    const changeStatus = (id, status) => { setCompanies(p => p.map(c => c.id === id ? { ...c, status } : c)); showToast(`Company status updated to ${status}.`, "success"); };

    return (
        <>
            <TopBar title="Companies" subtitle={`${companies.length} total registered companies`} setSidebarOpen={() => { }}>
                <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies…" />
                <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg,${C.main},${C.mid})`, boxShadow: `0 4px 16px rgba(21,101,192,0.35)` }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                    <span className="hidden sm:inline">Add Company</span>
                </button>
            </TopBar>

            <div className="p-6">
                <div className="flex gap-2 mb-5 flex-wrap">
                    {["All", "Verified", "Pending", "Suspended"].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all"
                            style={filter === f ? { background: C.main, color: "#fff", boxShadow: `0 4px 12px rgba(21,101,192,0.3)` } : { background: "#f1f5f9", color: "#64748b" }}>
                            {f} {f === "All" ? `(${companies.length})` : `(${companies.filter(c => c.status === f).length})`}
                        </button>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.length === 0 ? (
                        <div className="col-span-full text-center py-16 text-gray-400">
                            <p className="font-semibold text-sm">No companies found</p>
                        </div>
                    ) : filtered.map((c) => (
                        <div key={c.id} className="p-5 rounded-2xl transition-all"
                            style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 36px rgba(21,101,192,0.12)"; e.currentTarget.style.borderColor = C.lighter; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm"
                                        style={{ background: avatarColor(c.logo) }}>{c.logo}</div>
                                    <div>
                                        <h3 className="font-extrabold text-gray-900 text-sm leading-tight">{c.name}</h3>
                                        <p className="text-xs text-gray-500">{c.industry}</p>
                                    </div>
                                </div>
                                {statusBadge(c.status)}
                            </div>

                            <div className="space-y-1.5 mb-4 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    {c.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                                    {c.location} · {c.size} employees
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="font-bold" style={{ color: C.main }}>{c.jobs} active job posts</span>
                                </div>
                            </div>

                            <div className="flex gap-2 border-t pt-3" style={{ borderColor: "#f1f5f9" }}>
                                {c.status !== "Verified" && (
                                    <button onClick={() => changeStatus(c.id, "Verified")}
                                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
                                        style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>Verify</button>
                                )}
                                {c.status !== "Suspended" && (
                                    <button onClick={() => changeStatus(c.id, "Suspended")}
                                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
                                        style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Suspend</button>
                                )}
                                <button onClick={() => setDeleteTarget(c)}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                                    style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modal && <Modal title="Add New Company" onClose={() => setModal(false)}><AddCompanyForm onAdd={handleAdd} onClose={() => setModal(false)} /></Modal>}
            {deleteTarget && <DeleteModal name={deleteTarget.name} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />}
        </>
    );
};

/* ══════════════════════════════════════
   JOB REQUESTS PAGE
══════════════════════════════════════ */
const JobRequestsPage = ({ jobRequests, setJobRequests, showToast }) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filtered = jobRequests.filter(j =>
        (filter === "All" || j.status === filter) &&
        (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
    );

    const changeStatus = (id, status) => {
        setJobRequests(p => p.map(j => j.id === id ? { ...j, status, applicants: status === "Approved" ? j.applicants : 0 } : j));
        showToast(`Job request ${status.toLowerCase()}.`, status === "Approved" ? "success" : status === "Rejected" ? "error" : "info");
    };

    const typeColor = { "Full-time": { bg: "rgba(21,101,192,0.08)", color: C.main }, "Contract": { bg: "rgba(245,158,11,0.08)", color: "#f59e0b" }, "Internship": { bg: "rgba(16,185,129,0.08)", color: "#10b981" } };

    return (
        <>
            <TopBar title="Job Post Requests" subtitle={`${jobRequests.filter(j => j.status === "Pending").length} requests awaiting review`} setSidebarOpen={() => { }}>
                <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs…" />
            </TopBar>

            <div className="p-6">
                <div className="flex gap-2 mb-5 flex-wrap">
                    {["All", "Pending", "Approved", "Rejected"].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all"
                            style={filter === f ? { background: C.main, color: "#fff", boxShadow: `0 4px 12px rgba(21,101,192,0.3)` } : { background: "#f1f5f9", color: "#64748b" }}>
                            {f} {f === "All" ? `(${jobRequests.length})` : `(${jobRequests.filter(j => j.status === f).length})`}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 rounded-2xl" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
                            <p className="font-semibold text-sm text-gray-400">No job requests found</p>
                        </div>
                    ) : filtered.map((j) => (
                        <div key={j.id} className="p-5 rounded-2xl transition-all"
                            style={{ background: "#fff", border: `1px solid ${j.status === "Pending" ? "rgba(245,158,11,0.3)" : "#e2e8f0"}`, boxShadow: j.status === "Pending" ? "0 2px 12px rgba(245,158,11,0.08)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                {/* Company logo + info */}
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                                        style={{ background: avatarColor(j.logo) }}>{j.logo}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h3 className="font-extrabold text-gray-900">{j.title}</h3>
                                            {statusBadge(j.status)}
                                            {j.status === "Pending" && (
                                                <span className="text-xs px-2 py-0.5 rounded-full font-bold animate-pulse"
                                                    style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>⏳ Needs Review</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">{j.company} · {j.posted}</p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-semibold"
                                                style={typeColor[j.type] || typeColor["Full-time"]}>{j.type}</span>
                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                                                {j.location}
                                            </span>
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: "rgba(21,101,192,0.08)", color: C.main }}>{j.salary}</span>
                                            <span className="text-xs text-gray-400">Deadline: {j.deadline}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {j.skills.map(sk => (
                                                <span key={sk} className="text-xs px-2 py-0.5 rounded-md font-semibold"
                                                    style={{ background: "#f1f5f9", color: "#64748b" }}>{sk}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end flex-shrink-0">
                                    {j.status === "Approved" && (
                                        <div className="text-center">
                                            <p className="text-2xl font-black" style={{ color: C.main }}>{j.applicants}</p>
                                            <p className="text-xs text-gray-400">applicants</p>
                                        </div>
                                    )}
                                    {j.status !== "Approved" && (
                                        <button onClick={() => changeStatus(j.id, "Approved")}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5"
                                            style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                                            Approve
                                        </button>
                                    )}
                                    {j.status !== "Rejected" && (
                                        <button onClick={() => changeStatus(j.id, "Rejected")}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
                                            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                            Reject
                                        </button>
                                    )}
                                    {j.status !== "Pending" && (
                                        <button onClick={() => changeStatus(j.id, "Pending")}
                                            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                                            style={{ background: "#f1f5f9", color: "#64748b" }}>
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

/* ══════════════════════════════════════
   ROOT APP
══════════════════════════════════════ */
export default function JobProAdmin() {
    const [page, setPage] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [students, setStudents] = useState(initStudents);
    const [companies, setCompanies] = useState(initCompanies);
    const [jobRequests, setJobRequests] = useState(initJobRequests);

    const showToast = (msg, type = "info") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const renderPage = () => {
        switch (page) {
            case "dashboard": return <Dashboard students={students} companies={companies} jobRequests={jobRequests} setPage={setPage} />;
            // case "students": return <StudentsPage students={students} setStudents={setStudents} showToast={showToast} />;
            case "companies": return <CompaniesPage companies={companies} setCompanies={setCompanies} showToast={showToast} />;
            case "job-requests": return <JobRequestsPage jobRequests={jobRequests} setJobRequests={setJobRequests} showToast={showToast} />;
            case "settings": return <SettingsPage showToast={showToast} />;
            default: return null;
        }
    };

    const { userData } = useSelector( state => state.auth )
    const getAdmin = useGetAdmin()
    useEffect( () => { getAdmin() }, [ userData ] )

    return (

        <>

            <Navbar />
            <div className="grid h-fit " style={{ fontFamily: "'Nunito', sans-serif", background: "#f8fafc" }}>
                <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: ${C.main}; border-radius: 99px; }
        @keyframes slideIn { from { transform: translateX(60px); opacity:0; } to { transform: translateX(0); opacity:1; } }
      `}</style>

                {/* <Sidebar active={page} setActive={setPage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} pendingCount={pendingCount} /> */}

                {/* Main content */}
                <div className="flex-1 flex flex-col min-w-0 ">
                    {/* Mobile top bar */}
                    <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-white" style={{ borderColor: "#e2e8f0" }}>
                        <button onClick={() => setSidebarOpen(true)} className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(21,101,192,0.08)", color: C.main }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <span className="font-extrabold text-gray-900">Job<span style={{ color: C.main }}>Pro</span> Admin</span>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                            style={{ background: `linear-gradient(135deg,${C.light},${C.main})` }}>SA</div>
                    </div>

                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto">
                        {renderPage()}
                    </main>
                </div>

            </div>
                <Footer />

        </>
    );
}