import React from "react";
import { TodoItem, TodoForm } from "./";
import useTodos from "../hooks/useTodos";
import {
  filterPastTasks,
  filterTodayTasks,
  filterUpcomingTasks,
} from "../hooks/filters";

export default function TodoList({ filterType }) {
  const { todos } = useTodos();

  const todoList = todos || [];

  let filteredTodos = todoList;
  if (filterType === "past") {
    filteredTodos = filterPastTasks(todoList);
  } else if (filterType === "today") {
    filteredTodos = filterTodayTasks(todoList);
  } else if (filterType === "upcoming") {
    filteredTodos = filterUpcomingTasks(todoList);
  }

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
