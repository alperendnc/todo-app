import { TodoItem, TodoForm } from "./";
import useTodos from "../hooks/useTodos";

export default function TodoList() {
  const { todos } = useTodos();

  return (
    <div className="todo-container">
      <TodoForm />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
