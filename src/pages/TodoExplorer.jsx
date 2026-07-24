import { useEffect, useState } from "react";
import { getTodos } from "../services/todoService";
import TodoCard from "../components/TodoCard";
import SearchBar from "../components/SearchBar";

function TodoExplorer() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Pagination
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

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  let filteredTodos = [...todos];

  // Filter
  if (filter === "completed") {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.completed
    );
  }

  if (filter === "pending") {
    filteredTodos = filteredTodos.filter(
      (todo) => !todo.completed
    );
  }

  // Search
  if (search.trim()) {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // Pagination Logic
 const totalPages = Math.max(
  1,
  Math.ceil(filteredTodos.length / todosPerPage)
);

  const startIndex =
    (currentPage - 1) * todosPerPage;

  const paginatedTodos = filteredTodos.slice(
    startIndex,
    startIndex + todosPerPage
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Todos Explorer
      </h1>

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          margin: "20px 0",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              filter === "all"
                ? "#2563eb"
                : "#d1d5db",
            color:
              filter === "all"
                ? "#fff"
                : "#000",
          }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              filter === "completed"
                ? "#2563eb"
                : "#d1d5db",
            color:
              filter === "completed"
                ? "#fff"
                : "#000",
          }}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              filter === "pending"
                ? "#2563eb"
                : "#d1d5db",
            color:
              filter === "pending"
                ? "#fff"
                : "#000",
          }}
        >
          Pending
        </button>
      </div>

      {/* Todo Cards */}
      {paginatedTodos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          search={search}
        />
      ))}

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "25px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
                background:
                  currentPage === index + 1
                    ? "#2563eb"
                    : "#fff",
                color:
                  currentPage === index + 1
                    ? "#fff"
                    : "#000",
              }}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>

    {/* Footer */}
<div
  style={{
    marginTop: "25px",
    padding: "15px",
    borderTop: "1px solid #ddd",
    textAlign: "center",
    fontWeight: "600",
  }}
>
  Showing {filteredTodos.length} of {todos.length} todos
  <br />
  Page {currentPage} of {totalPages}
</div>
    </div>
  );
}

export default TodoExplorer;