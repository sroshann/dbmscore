const Search = ({ value, onChange, placeholder }) => (
    <div className="relative flex-1 max-w-xs">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input value={value} onChange={onChange} placeholder={placeholder || "Search…"}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-gray-700 outline-none border transition-all"
            style={{ background: "#f8fafc", borderColor: "#dce3ef" }}
            onFocus={e => { e.target.style.borderColor = C.main; e.target.style.boxShadow = "0 0 0 3px rgba(21,101,192,0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "#dce3ef"; e.target.style.boxShadow = "none"; }} />
    </div>
);

export default Search