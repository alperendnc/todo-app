import { useState } from "react";

export interface Todo {
  id: string;
  task: string;
  description: string;
  note?: string;
  date?: string;
  completed: boolean;
  priority?: string;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const addTodo = (todo: Todo) => {
    const newTodo: Todo = {
      id: todo.id || Date.now().toString(),
      task: todo.task,
      description: todo.description,
      date: todo.date || "",
      completed: todo.completed || false,
      priority: todo.priority || "",
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEdit(true);
  };

  const updateTodo = (
    id: string,
    newTask: string,
    newDescription: string,
    newDate: string,
    newPriority: string
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task: newTask,
              description: newDescription,
              date: newDate,
              priority: newPriority,
            }
          : todo
      )
    );
    setEditingTodo(null);
    setIsEdit(false);
  };

  const addNote = (id: string, note: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, note } : todo))
    );
  };

  const deleteCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    startEditing,
    updateTodo,
    editingTodo,
    isEdit,
    addNote,
    deleteCompleted,
    deleteAll,
  };
};

export default useTodos;
