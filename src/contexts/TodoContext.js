import { createContext, useContext, useState } from "react";

export const addItem = (items, setItems, item) => {
  const newItem = {
    id: item.id || Date.now(),
    ...item,
  };
  setItems((prev) => [...prev, newItem]);
};

export const deleteItem = (items, setItems, id) => {
  setItems((prev) => prev.filter((item) => item.id !== id));
};

export const updateItem = (items, setItems, id, updatedFields) => {
  setItems((prev) =>
    prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
  );
};

export const toggleItemField = (items, setItems, id, field) => {
  setItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, [field]: !item[field] } : item
    )
  );
};

export const clearCompletedItems = (items, setItems, field = "completed") => {
  setItems((prev) => prev.filter((item) => !item[field]));
};

export const clearAllItems = (setItems) => {
  setItems([]);
};

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const addTodo = (todo) => addItem(todos, setTodos, todo);
  const deleteTodo = (id) => deleteItem(todos, setTodos, id);
  const toggleComplete = (id) =>
    toggleItemField(todos, setTodos, id, "completed");
  const startEditing = (todo) => {
    setEditingTodo(todo);
    setIsEdit(true);
  };
  const updateTodo = (id, newTask) => {
    updateItem(todos, setTodos, id, newTask);
    setEditingTodo(null);
    setIsEdit(false);
  };
  const addNote = (id, note) => updateItem(todos, setTodos, id, { note });
  const deleteCompleted = () => clearCompletedItems(todos, setTodos);
  const deleteAll = () => clearAllItems(setTodos);

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
