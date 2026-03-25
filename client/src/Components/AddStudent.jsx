import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { useAddStudent } from "../Hooks/admin.hook";

const AddStudent = ({ close }) => {

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

    const [form, setForm] = useState({ 
        
        firstName: "", 
        lastName : '', 
        email: "", 
        roll_number: "", 
        department : "", 
        dob: "", 
        cgpa: "" ,
        password: ""
    
    });
    const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
    const addStudent = useAddStudent()

    const handleSubmit = (e) => {

        e.preventDefault();
        addStudent( form )
        close( false )
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-[70%] m-auto">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Input label="First Name" value={form.name} onChange={f("firstName")} placeholder="e.g. Shamil" required /></div>
                <div className="col-span-2"><Input label="Last Name" value={form.name} onChange={f("lastName")} placeholder="e.g. Roshan" required /></div>
                <Input label="Email Address" type="email" value={form.email} onChange={f("email")} placeholder="student@example.com" required />
                <Input label="Roll Number" value={form.phone} onChange={f("roll_number")} placeholder="B24CSB78" required />
                <Input label="Password" value={form.password} onChange={f("password")} required />
                <Select 
                
                    label="Department" 
                    value={form.department} 
                    onChange={f("department")} 
                    options={[
                        
                        "CS", 
                        "EC", 
                        "EEE", 
                        "Mech", 
                        "Chem", 
                        "AI"
                    
                    ]} 
                    required 
                    
                />
                <Input label="DOB" value={form.dob} onChange={f("dob")} required />
                <Input label="CGPA" type="number" value={form.cgpa} onChange={f("cgpa")} placeholder="e.g. 8.5" />
            </div>
            <div className="flex gap-3 pt-2">
                <button onClick={ () => { close( false ) } } type="button" className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "#f1f5f9", color: "#64748b" }}>Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg,${C.main},${C.mid})`, boxShadow: `0 6px 20px rgba(21,101,192,0.35)` }}
                    >
                    Add Student
                </button>
            </div>
        </form>
    );
};

export default AddStudent