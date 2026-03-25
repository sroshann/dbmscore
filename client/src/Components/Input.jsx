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

const Input = ({ label, type = "text", value, onChange, placeholder, required }) => (
    <div>
        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
            className="w-full px-4 py-3 rounded-xl text-sm text-gray-700 outline-none transition-all border"
            style={{ background: "#f8fafc", borderColor: "#dce3ef" }}
            onFocus={e => { e.target.style.borderColor = C.main; e.target.style.boxShadow = "0 0 0 3px rgba(21,101,192,0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "#dce3ef"; e.target.style.boxShadow = "none"; }} />
    </div>
);

export default Input