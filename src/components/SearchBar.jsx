function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}

export default SearchBar;