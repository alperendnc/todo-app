import React from "react";
import { TodoItem, TodoForm } from "./";
import useTodos from "../hooks/useTodos";
import { filterTasksByDate } from "../hooks/useFilters";

export default function TodoList({ filterType }) {
  const { todos } = useTodos();
  const todoList = todos || [];

  const filteredTodos = filterTasksByDate(todoList, filterType);

  return (
    <div className="todo-container">
      <TodoForm />
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
