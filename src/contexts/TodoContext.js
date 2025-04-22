import { createContext, useContext, useState } from "react";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const addTodo = (todo) => {
    const newTodo = {
      id: todo.id || Date.now(),
      task: todo.task,
      description: todo.description,
      note: todo.note || "",
      date: todo.date || "",
      completed: todo.completed || false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));
  const toggleComplete = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const startEditing = (todo) => {
    setEditingTodo(todo);
    setIsEdit(true);
  };
  const updateTodo = (id, newTask) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...newTask } : t))
    );
    setEditingTodo(null);
    setIsEdit(false);
  };
  const addNote = (id, note) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, note } : t)));
  const deleteCompleted = () =>
    setTodos((prev) => prev.filter((t) => !t.completed));
  const deleteAll = () => setTodos([]);

  return (
    <TodosContext.Provider
      value={{
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
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
