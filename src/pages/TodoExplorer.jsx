import { useEffect, useState } from "react";
import { getTodos } from "../services/todoService";
import TodoCard from "../components/TodoCard";
import SearchBar from "../components/SearchBar";

function TodoExplorer() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  let filteredTodos = [...todos];

  if (filter === "completed") {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  }

  if (filter === "pending") {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  }

  if (search.trim()) {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / todosPerPage));
  const startIndex = (currentPage - 1) * todosPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + todosPerPage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-8">
        <h1 className="mb-6 text-center text-3xl font-semibold text-slate-800 sm:text-4xl">
          Todos Explorer
        </h1>

        <SearchBar search={search} setSearch={setSearch} />

        <div className="my-5 flex flex-wrap gap-3">
          {[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                filter === option.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {paginatedTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} search={search} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-700"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 text-center text-sm font-medium text-slate-600">
          Showing {filteredTodos.length} of {todos.length} todos
          <br />
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
}

export default TodoExplorer;