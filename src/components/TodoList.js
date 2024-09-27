import { useState } from "react";
import { TodoItem, TodoForm } from "./";
import useTodos from "../hooks/useTodos";
import dayjs from "dayjs";

export default function TodoList() {
  const { todos, addTodo } = useTodos();
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(dayjs());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const filtered = todos.filter((todo) =>
      dayjs(todo.date).isSame(date, "day")
    );
    setFilteredTodos(filtered);
  };

  const handleClearClick = () => {
    setSelectedDate(null);
    setFilteredTodos(todos);
  };

  const handlePreviousDates = () => {
    setStartDate((prev) => prev.subtract(7, "day"));
  };

  const handleNextDates = () => {
    setStartDate((prev) => prev.add(7, "day"));
  };

  const renderDateButtons = () => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = startDate.add(index, "day");
      return (
        <button
          key={index}
          onClick={() => handleDateClick(date.format("YYYY-MM-DD"))}
          className="date-button"
        >
          {date.format("DD/MM/YYYY")}
        </button>
      );
    });
  };

  return (
    <div className="todo-container">
      <TodoForm addTodo={addTodo} />

      <div className="todo-content">
        <div className="date-buttons">
          <button onClick={handlePreviousDates} className="arrow-button">
            ◀
          </button>
          {renderDateButtons()}
          <button onClick={handleNextDates} className="arrow-button">
            ▶
          </button>
        </div>
        {selectedDate && (
          <div>
            <button onClick={handleClearClick} className="clear-button">
              ✖
            </button>
            <h3>Tasks for {dayjs(selectedDate).format("YYYY-MM-DD")}</h3>
          </div>
        )}
        {(selectedDate ? filteredTodos : todos).map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
}
