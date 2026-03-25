import { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer'

const C = {
    darkest: "#071e3d",
    dark: "#0a2a56",
    main: "#1565c0",
    mid: "#1a4f8a",
    light: "#42a5f5",
    lighter: "#64b5f6",
    ghost: "#90caf9",
    accent: "#00e5ff",
};

const font = "'Nunito', sans-serif";

/* ── useInView Hook ── */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

const categories = ["All", "Design", "Engineering", "Marketing", "Finance", "Remote"];

const Hero = () => {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [animDone, setAnimDone] = useState(false);

    useEffect(() => { setTimeout(() => setAnimDone(true), 100); }, []);

    const floatingJobs = [
        { top: "12%", left: "4%", role: "UI Designer", co: "Figma", salary: "$120k", color: "#7c3aed" },
        { top: "60%", left: "2%", role: "Backend Dev", co: "Stripe", salary: "$160k", color: "#0ea5e9" },
        { top: "20%", right: "3%", role: "Data Scientist", co: "Google", salary: "$180k", color: "#10b981" },
        { top: "65%", right: "2%", role: "Product Manager", co: "Notion", salary: "$145k", color: "#f59e0b" },
    ];

    return (
        <section className="relative overflow-hidden py-24 lg:py-36"
            style={{ background: `linear-gradient(160deg,${C.mid} 0%,${C.main} 50%,${C.dark} 100%)` }}>

            {/* Background layers */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
                style={{ background: `radial-gradient(circle,${C.lighter} 0%,transparent 70%)`, transform: "translate(30%,-30%)" }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
                style={{ background: `radial-gradient(circle,${C.light} 0%,transparent 70%)`, transform: "translate(-30%,30%)" }} />

            {/* Floating job cards – desktop only */}
            {floatingJobs.map((j, i) => (
                <div key={i} className="hidden xl:block absolute z-10 pointer-events-none"
                    style={{
                        top: j.top, left: j.left, right: j.right,
                        animation: `floatCard ${2.5 + i * 0.4}s ease-in-out infinite alternate`,
                        opacity: animDone ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.15}s`,
                    }}>
                    <div className="px-4 py-3 rounded-2xl backdrop-blur-md flex items-center gap-3 w-52"
                        style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                            style={{ background: j.color }}>{j.co[0]}</div>
                        <div>
                            <p className="text-white text-xs font-bold leading-tight">{j.role}</p>
                            <p className="text-blue-200 text-xs">{j.co} · {j.salary}</p>
                        </div>
                        <span className="ml-auto w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                    </div>
                </div>
            ))}

            <style>{`
        @keyframes floatCard { from { transform: translateY(0px); } to { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .anim-1 { animation: fadeUp 0.65s ease both; }
        .anim-2 { animation: fadeUp 0.65s 0.12s ease both; }
        .anim-3 { animation: fadeUp 0.65s 0.24s ease both; }
        .anim-4 { animation: fadeUp 0.65s 0.36s ease both; }
        .anim-5 { animation: fadeUp 0.65s 0.48s ease both; }
        @keyframes revealUp { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        .reveal { opacity:0; transform:translateY(36px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.show { opacity:1; transform:translateY(0); }
      `}</style>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
                {/* Pill badge */}
                <div className="anim-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
                    style={{ background: "rgba(100,181,246,0.18)", color: C.ghost, border: "1px solid rgba(100,181,246,0.3)" }}>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                    #1 Job Platform · 50,000+ Active Listings
                </div>

                <h1 className="anim-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6">
                    Find Your <span style={{ color: C.lighter }}>Dream</span><br />
                    Career <span className="relative inline-block">
                        Today
                        <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full opacity-60" style={{ background: `linear-gradient(90deg,${C.lighter},transparent)` }} />
                    </span>
                </h1>

                <p className="anim-3 text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
                    Connect with 12,000+ top employers worldwide. Whether you're looking for your first job or your dream role — JobPro makes it happen.
                </p>

                {/* Search Bar */}
                <div className="anim-4 bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl max-w-2xl mx-auto mb-6"
                    style={{ boxShadow: "0 20px 60px rgba(13,71,161,0.35)" }}>
                    <div className="flex items-center gap-2 flex-1 px-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke={C.main} strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title, skills, or company…"
                            className="flex-1 py-2.5 text-sm text-gray-700 outline-none placeholder-gray-400" style={{ background: "transparent" }} />
                    </div>
                    <div className="hidden sm:flex items-center px-3 border-l border-gray-100">
                        <svg className="w-4 h-4 flex-shrink-0 mr-2" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location or Remote"
                            className="w-32 py-2.5 text-sm text-gray-700 outline-none placeholder-gray-400" style={{ background: "transparent" }} />
                    </div>
                    <button className="px-7 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
                        style={{ background: `linear-gradient(135deg,${C.main},${C.mid})`, boxShadow: `0 6px 20px rgba(21,101,192,0.4)` }}>
                        Search Jobs
                    </button>
                </div>

                {/* Category pills */}
                <div className="anim-5 flex flex-wrap justify-center gap-2">
                    {categories.map(c => (
                        <button key={c} onClick={() => setActiveCategory(c)}
                            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5"
                            style={activeCategory === c
                                ? { background: "#fff", color: C.main, boxShadow: "0 4px 12px rgba(255,255,255,0.25)" }
                                : { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.18)" }}>
                            {c}
                        </button>
                    ))}
                </div>

                {/* Stat strip */}
                <div className="anim-5 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[["50K+", "Active Jobs"], ["12K+", "Companies"], ["2M+", "Candidates"], ["98%", "Success Rate"]].map(([n, l]) => (
                        <div key={l} className="py-4 px-3 rounded-2xl"
                            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                            <p className="text-white text-2xl font-black">{n}</p>
                            <p className="text-blue-300 text-xs mt-0.5">{l}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════════
   TRUSTED BY LOGOS
════════════════════════════════════════ */
const TrustBar = () => {
    const [ref, visible] = useInView();
    const logos = ["Google", "Microsoft", "Stripe", "Airbnb", "Spotify", "Notion", "Figma", "Shopify"];
    return (
        <section ref={ref} className="py-14 border-b" style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className={`text-center text-xs font-bold uppercase tracking-widest mb-8 reveal ${visible ? "show" : ""}`} style={{ color: "#94a3b8" }}>
                    Trusted by teams at world-class companies
                </p>
                <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                    {logos.map((name, i) => (
                        <div key={name} className={`reveal ${visible ? "show" : ""}`} style={{ transitionDelay: `${i * 0.06}s` }}>
                            <div className="px-5 py-3 rounded-xl font-black text-sm tracking-tight transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                                style={{ background: "#fff", color: "#334155", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                                {name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════════
   HOW IT WORKS
════════════════════════════════════════ */
const HowItWorks = () => {
    const [ref, visible] = useInView();
    const [activeTab, setActiveTab] = useState("candidate");

    const steps = {
        candidate: [
            { title: "Discover Matches", desc: "Our smart algorithm surfaces the most relevant roles based on your background and preferences." },
            { title: "Apply with One Click", desc: "Send your application instantly to any job with your pre-filled profile — no repetitive forms." },
            { title: "Land the Role", desc: "Track applications, schedule interviews, and negotiate offers — all inside JobPro." },
        ],
        employer: [
            { title: "Post Your Role", desc: "Create a detailed job listing in under 5 minutes with our guided posting wizard." },
            { title: "Schedule Interviews", desc: "Integrated scheduling lets candidates book slots directly — zero email back-and-forth." },
            { title: "Make the Hire", desc: "Extend offers, manage documents, and onboard your new hire all from one dashboard." },
        ],
    };

    return (
        <section ref={ref} className="py-24" style={{ background: "#f8fafc" }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-12 reveal ${visible ? "show" : ""}`}>
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ background: "rgba(21,101,192,0.08)", color: C.main }}>How It Works</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Simple steps to your next opportunity</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">Whether you're hiring or job-seeking, JobPro makes the process seamless.</p>
                </div>

                {/* Tab toggle */}
                <div className={`flex justify-center mb-12 reveal ${visible ? "show" : ""}`} style={{ transitionDelay: "0.1s" }}>
                    <div className="flex p-1 rounded-xl gap-1" style={{ background: "#e8edf5" }}>
                        {["candidate", "employer"].map(t => (
                            <button key={t} onClick={() => setActiveTab(t)}
                                className="px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-300"
                                style={activeTab === t ? { background: C.main, color: "#fff", boxShadow: `0 4px 14px rgba(21,101,192,0.35)` } : { background: "transparent", color: "#64748b" }}>
                                {t === "candidate" ? "Job Seeker" : "Employer"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {steps[activeTab].map((s, i) => (
                        <div key={i} className={`relative p-6 rounded-2xl group cursor-default reveal ${visible ? "show" : ""}`}
                            style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transitionDelay: `${i * 0.1}s`, transition: "box-shadow 0.3s, transform 0.3s, opacity 0.65s ease, transform 0.65s ease" }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px rgba(21,101,192,0.15)`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            {/* Step number */}
                            <span className="absolute top-4 right-4 text-xs font-black opacity-10 text-gray-900 text-3xl">{String(i + 1).padStart(2, "0")}</span>
                            <h3 className="font-extrabold text-gray-900 mb-2">{s.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            {i < steps[activeTab].length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 z-10" style={{ background: `linear-gradient(90deg,${C.lighter},transparent)` }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════════
   FEATURED JOBS
════════════════════════════════════════ */
const jobs = [
    { title: "Senior Product Designer", company: "Figma", location: "San Francisco, CA", type: "Full-time", salary: "$130–160k", tags: ["UI/UX", "Figma", "Design Systems"], color: "#7c3aed", hot: true },
    { title: "Full-Stack Engineer", company: "Stripe", location: "Remote", type: "Full-time", salary: "$150–190k", tags: ["React", "Node.js", "PostgreSQL"], color: "C.main", hot: true },
    { title: "Data Scientist", company: "Google", location: "New York, NY", type: "Full-time", salary: "$170–210k", tags: ["Python", "ML", "TensorFlow"], color: "#ea4335", hot: false },
    { title: "Growth Marketing Lead", company: "Notion", location: "Remote", type: "Contract", salary: "$90–120k", tags: ["SEO", "Analytics", "Content"], color: "#000000", hot: false },
    { title: "DevOps Engineer", company: "AWS", location: "Seattle, WA", type: "Full-time", salary: "$160–200k", tags: ["Kubernetes", "Terraform", "CI/CD"], color: "#f59e0b", hot: true },
    { title: "iOS Developer", company: "Airbnb", location: "San Francisco, CA", type: "Full-time", salary: "$140–175k", tags: ["Swift", "SwiftUI", "Xcode"], color: "#ef4444", hot: false },
];

const FeaturedJobs = () => {
    const [ref, visible] = useInView();
    const [saved, setSaved] = useState([]);
    const [filter, setFilter] = useState("All");
    const filters = ["All", "Full-time", "Contract", "Remote"];

    const filtered = filter === "Remote" ? jobs.filter(j => j.location === "Remote")
        : filter === "All" ? jobs : jobs.filter(j => j.type === filter);

    return (
        <section id="jobs" ref={ref} className="py-24" style={{ background: "#fff" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 reveal ${visible ? "show" : ""}`}>
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                            style={{ background: "rgba(21,101,192,0.08)", color: C.main }}>Featured Jobs</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Handpicked for you</h2>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {filters.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                                style={filter === f ? { background: C.main, color: "#fff", boxShadow: `0 4px 14px rgba(21,101,192,0.3)` } : { background: "#f1f5f9", color: "#64748b" }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((job, i) => (
                        <div key={i} className={`relative p-6 rounded-2xl group cursor-pointer reveal ${visible ? "show" : ""}`}
                            style={{ background: "#fff", border: "1px solid #e2e8f0", transitionDelay: `${i * 0.08}s`, transition: "box-shadow 0.3s, transform 0.3s, opacity 0.65s ease, transform 0.65s ease" }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(21,101,192,0.14)`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.lighter; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>

                            {job.hot && (
                                <span className="absolute top-4 right-12 text-xs px-2.5 py-1 rounded-full font-bold"
                                    style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>🔥 Hot</span>
                            )}

                            {/* Save button */}
                            <button onClick={() => setSaved(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])}
                                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                                style={{ background: saved.includes(i) ? "rgba(21,101,192,0.1)" : "transparent", border: "1px solid #e2e8f0" }}>
                                <svg className="w-4 h-4" fill={saved.includes(i) ? C.main : "none"} stroke={saved.includes(i) ? C.main : "#94a3b8"} strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                                </svg>
                            </button>

                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                                    style={{ background: job.color === "C.main" ? C.main : job.color }}>
                                    {job.company[0]}
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-gray-900 leading-tight">{job.title}</h3>
                                    <p className="text-gray-500 text-sm">{job.company}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {job.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                                        style={{ background: "rgba(21,101,192,0.07)", color: C.main }}>{tag}</span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-3">
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                                        {job.location}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                        style={{ background: "rgba(16,185,129,0.08)", color: "#10b981" }}>{job.type}</span>
                                </div>
                                <span className="text-sm font-black" style={{ color: C.main }}>{job.salary}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`text-center mt-10 reveal ${visible ? "show" : ""}`} style={{ transitionDelay: "0.5s" }}>
                    <button className="px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        style={{ background: `linear-gradient(135deg,${C.main},${C.mid})`, boxShadow: `0 6px 24px rgba(21,101,192,0.35)` }}>
                        Browse All 50,000+ Jobs →
                    </button>
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════════
   TOP CATEGORIES
════════════════════════════════════════ */
const catList = [
    { icon: "💻", name: "Software Engineering", count: "12,450", color: "#1565c0" },
    { icon: "🎨", name: "Design & Creative", count: "6,320", color: "#7c3aed" },
    { icon: "📊", name: "Data & Analytics", count: "8,100", color: "#0ea5e9" },
    { icon: "📣", name: "Marketing & Growth", count: "5,210", color: "#f59e0b" },
    { icon: "💰", name: "Finance & Accounting", count: "4,890", color: "#10b981" },
    { icon: "🛡️", name: "Cybersecurity", count: "3,670", color: "#ef4444" },
    { icon: "📱", name: "Mobile Development", count: "4,200", color: "#8b5cf6" },
    { icon: "🤝", name: "Sales & Business Dev", count: "5,980", color: "#06b6d4" },
];

const Categories = () => {
    const [ref, visible] = useInView();
    return (
        <section ref={ref} className="py-24" style={{ background: "#f8fafc" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-12 reveal ${visible ? "show" : ""}`}>
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ background: "rgba(21,101,192,0.08)", color: C.main }}>Browse by Category</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Find your field</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Explore curated job categories with thousands of opportunities waiting for you.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {catList.map((c, i) => (
                        <div key={i} className={`p-5 rounded-2xl cursor-pointer group reveal ${visible ? "show" : ""}`}
                            style={{ background: "#fff", border: "1px solid #e2e8f0", transitionDelay: `${i * 0.07}s`, transition: "box-shadow 0.3s, transform 0.3s, border-color 0.3s, opacity 0.65s ease, transform 0.65s ease" }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px rgba(21,101,192,0.12)`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.lighter; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                                style={{ background: `${c.color}14` }}>{c.icon}</div>
                            <h3 className="font-extrabold text-gray-900 text-sm mb-1 leading-tight">{c.name}</h3>
                            <p className="text-xs font-semibold" style={{ color: C.main }}>{c.count} jobs</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════════
   TESTIMONIALS
════════════════════════════════════════ */
const testimonials = [
    { name: "Sarah Robinson", role: "UX Designer @ Google", avatar: "SR", quote: "JobPro helped me land my dream role at Google in under 3 weeks. The AI matching is incredible — every job it suggested was actually relevant.", stars: 5, color: "#1565c0" },
    { name: "Marcus Chen", role: "Staff Engineer @ Stripe", avatar: "MC", quote: "After 6 years at the same company I was terrified to job hunt again. JobPro made it so easy — I had 4 interviews in my first week.", stars: 5, color: "#7c3aed" },
    { name: "Priya Sharma", role: "Head of Marketing @ Notion", avatar: "PS", quote: "I found my current role on JobPro and now I use it to hire for my team. Both sides of the platform are genuinely great.", stars: 5, color: "#10b981" },
    { name: "Alex Torres", role: "Data Scientist @ Airbnb", avatar: "AT", quote: "The salary transparency on JobPro is unmatched. I negotiated 20% higher than my previous offer because I knew exactly what the market paid.", stars: 5, color: "#f59e0b" },
];

const Testimonials = () => {
    const [ref, visible] = useInView();
    const [active, setActive] = useState(0);

    return (
        <section ref={ref} className="py-24 overflow-hidden"
            style={{ background: `linear-gradient(160deg,${C.mid} 0%,${C.main} 50%,${C.dark} 100%)` }}>
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-14 reveal ${visible ? "show" : ""}`}>
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ background: "rgba(255,255,255,0.12)", color: C.ghost }}>Success Stories</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Loved by 2 million+ professionals</h2>
                    <p className="text-blue-200 max-w-md mx-auto">Real stories from real people who found their path with JobPro.</p>
                </div>

                {/* Active card */}
                <div className={`reveal ${visible ? "show" : ""}`} style={{ transitionDelay: "0.2s" }}>
                    <div className="relative p-8 sm:p-10 rounded-3xl max-w-2xl mx-auto"
                        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                        <div className="flex gap-1 mb-5">
                            {[...Array(testimonials[active].stars)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-white text-lg leading-relaxed font-medium mb-8 italic">
                            "{testimonials[active].quote}"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                                style={{ background: `linear-gradient(135deg,${testimonials[active].color},${C.mid})` }}>
                                {testimonials[active].avatar}
                            </div>
                            <div>
                                <p className="text-white font-extrabold">{testimonials[active].name}</p>
                                <p className="text-blue-300 text-sm">{testimonials[active].role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Avatars nav */}
                <div className="flex justify-center gap-4 mt-8">
                    {testimonials.map((t, i) => (
                        <button key={i} onClick={() => setActive(i)}
                            className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm transition-all"
                            style={{
                                background: i === active ? `linear-gradient(135deg,${t.color},${C.mid})` : "rgba(255,255,255,0.12)",
                                color: "#fff",
                                border: i === active ? "2px solid #fff" : "2px solid rgba(255,255,255,0.2)",
                                transform: i === active ? "scale(1.15)" : "scale(1)",
                                boxShadow: i === active ? "0 4px 16px rgba(0,0,0,0.25)" : "none",
                            }}>{t.avatar}</button>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════ */
const CTABanner = () => {
    const [ref, visible] = useInView();
    return (
        <section ref={ref} className="py-24" style={{ background: "#f8fafc" }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`relative rounded-3xl px-8 py-16 text-center overflow-hidden reveal ${visible ? "show" : ""}`}
                    style={{ background: `linear-gradient(135deg,${C.mid} 0%,${C.main} 50%,${C.dark} 100%)`, boxShadow: `0 20px 60px rgba(21,101,192,0.4)` }}>
                    <div className="absolute inset-0 opacity-5"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
                        style={{ background: `radial-gradient(circle,${C.lighter} 0%,transparent 70%)`, transform: "translate(30%,-30%)" }} />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
                        style={{ background: `radial-gradient(circle,${C.light} 0%,transparent 70%)`, transform: "translate(-30%,30%)" }} />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
                            style={{ background: "rgba(100,181,246,0.18)", color: C.ghost, border: "1px solid rgba(100,181,246,0.3)" }}>
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                            Join 2,000,000+ professionals
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                            Ready to find your<br /><span style={{ color: C.lighter }}>dream job?</span>
                        </h2>
                        <p className="text-blue-200 max-w-lg mx-auto mb-10 text-lg">
                            Create your free profile today and get matched with thousands of relevant opportunities instantly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 rounded-xl text-sm font-black text-blue-900 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                                style={{ background: "#fff", boxShadow: "0 8px 30px rgba(255,255,255,0.25)" }}>
                                🚀 Create Free Account
                            </button>
                            <button className="px-8 py-4 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                                Browse Jobs First →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Landing() {
    return (
        <div style={{ fontFamily: font }}>
            <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #1565c0; border-radius: 99px; }
        @keyframes floatCard { from { transform: translateY(0px); } to { transform: translateY(-12px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .anim-1 { animation: fadeUp 0.65s ease both; }
        .anim-2 { animation: fadeUp 0.65s 0.12s ease both; }
        .anim-3 { animation: fadeUp 0.65s 0.24s ease both; }
        .anim-4 { animation: fadeUp 0.65s 0.36s ease both; }
        .anim-5 { animation: fadeUp 0.65s 0.48s ease both; }
        .reveal { opacity:0; transform:translateY(36px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.show { opacity:1; transform:translateY(0); }
      `}</style>

            <Navbar />
            <Hero />
            <TrustBar />
            <HowItWorks />
            <FeaturedJobs />
            <Categories />
            <Testimonials />
            <CTABanner />
            <Footer />
            
        </div>
    );
}