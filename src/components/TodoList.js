import { TodoItem, TodoForm } from "./";
import useTodos from "../hooks/useTodos";

export default function TodoList() {
  const { todos, addTodo } = useTodos();

  return (
    <div className="todo-container">
      <TodoForm addTodo={addTodo} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
}
