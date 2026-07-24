import Button from "./Button";

function FilterButtons({ filter, setFilter }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <Button
        label="All"
        active={filter === "all"}
        onClick={() => setFilter("all")}
      />

      <Button
        label="Completed"
        active={filter === "completed"}
        onClick={() => setFilter("completed")}
      />

      <Button
        label="Pending"
        active={filter === "pending"}
        onClick={() => setFilter("pending")}
      />
    </div>
  );
}

export default FilterButtons;