function Button({ label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 font-medium transition ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
      }`}
    >
      {label}
    </button>
  );
}

export default Button;