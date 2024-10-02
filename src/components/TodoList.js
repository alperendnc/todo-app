import React from "react";
import { TodoItem, TodoForm } from "./";
import useTodos from "../hooks/useTodos";

export default function TodoList() {
  const { todos } = useTodos();

  const todoList = todos || [];

  return (
    <div className="todo-container">
      <TodoForm />
      <ul className="todo-list">
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
