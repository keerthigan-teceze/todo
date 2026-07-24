function TodoCard({ todo, search }) {
  const isMatched =
    search &&
    todo.title.toLowerCase().includes(search.toLowerCase());

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        isMatched
          ? "border-yellow-300 bg-yellow-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="mb-2 text-left text-lg font-semibold text-slate-800">
            {todo.title}
          </h3>

          <p className="text-left text-sm text-slate-500">
            ID: {todo.id} • User: {todo.userId}
          </p>
        </div>

        <span
          className={`inline-flex self-start rounded-full px-3 py-1 text-sm font-semibold ${
            todo.completed
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </div>
    </div>
  );
}

export default TodoCard;