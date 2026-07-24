function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "15px",
      }}
    />
  );
}

export default SearchBar;