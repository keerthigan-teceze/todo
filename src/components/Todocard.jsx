function TodoCard({ todo, search }) {
  const isMatched =
    search &&
    todo.title.toLowerCase().includes(search.toLowerCase());

  return (
    <div
      style={{
        backgroundColor: isMatched ? "#FFF9C4" : "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              marginBottom: "8px",
              textAlign: "left",
            }}
          >
            {todo.title}
          </h3>

          <p
            style={{
              margin: 0,
              textAlign: "left",
              color: "#666",
            }}
          >
            ID: {todo.id} • User: {todo.userId}
          </p>
        </div>

        <span
          style={{
            fontWeight: "600",
            color: todo.completed ? "green" : "orange",
            alignSelf: "center",
          }}
        >
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
}

export default TodoCard;