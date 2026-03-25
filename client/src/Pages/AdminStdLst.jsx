import { useEffect, useState } from "react";
import Search from "../Components/Search";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useGetStudents } from "../Hooks/admin.hook";
import AddStudent from "../Components/AddStudent";

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

const AdminStdLst = () => {
    
    const [search, setSearch] = useState("");
    const [ students, setStudents ] = useState(null)
    const [ addStd, setAddStd ] = useState( false )
    const getStudent = useGetStudents()
    const getData = async () => {

        const data = await getStudent()
        setStudents( data )

    }
    useEffect( () => { getData() }, [] )

    return (
        <>

            <Navbar />
            <Topbar title="Students" >
                <Search value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students…" />
                <button onClick={ () => setAddStd( true ) } className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg,${C.main},${C.mid})`, boxShadow: `0 4px 16px rgba(21,101,192,0.35)` }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                    <span className="hidden sm:inline" >Add Student</span>
                </button>
            </Topbar>

            { addStd && <AddStudent close={ setAddStd } /> }
            <div className="p-6">

                {/* Table */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    {/* Table header */}
                    <div className="px-5 py-3 grid text-xs font-extrabold uppercase tracking-wide hidden md:grid"
                        style={{ background: "#f8fafc", color: "#64748b", gridTemplateColumns: "2fr 2fr 1.5fr 2fr 0.8fr 1fr", borderBottom: "1px solid #e2e8f0" }}>
                        <span>Student</span><span>Roll No</span><span>Email</span><span>Course</span><span>DOB</span><span>CGPA</span>
                    </div>

                    { students && students.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#f1f5f9" }}>
                                <svg className="w-8 h-8" fill="none" stroke="#94a3b8" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <p className="font-semibold text-sm">No students found</p>
                        </div>
                    ) :
                     (
                        <div className="divide-y" style={{ divideColor: "#f8fafc" }}>
                            { students && students.map((s, i) => (
                                <div key={s.id} className="px-5 py-4 flex flex-col md:grid gap-3 md:gap-0 items-start md:items-center transition-colors hover:bg-blue-50/30"
                                    style={{ gridTemplateColumns: "2fr 2fr 1.5fr 2fr 0.8fr 1fr" }}>
                                    
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-extrabold text-gray-900 text-sm">{s.first_name + ' ' + s.last_name}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700">{s.roll_number}</p>
                                    <div className="md:block">
                                        <p className="text-sm text-gray-700">{s.email}</p>
                                        <p className="text-xs text-gray-400">{s.phone}</p>
                                    </div>
                                    <span className="text-sm text-gray-700">{s.department}</span>
                                    <span className="text-sm text-gray-700">{s.date_of_birth}</span>
                                    <span className="text-sm font-bold" style={{ color: C.main }}>{s.cgpa}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminStdLst