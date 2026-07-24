function Button({ label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: active ? "#2563eb" : "#e5e7eb",
        color: active ? "#fff" : "#000",
      }}
    >
      {label}
    </button>
  );
}

export default Button;