import { useEffect, useState, useCallback } from "react";

import { useAuth } from "src/contexts/UseAuth";

export interface Todo {
  id: string;
  task: string;
  description: string;
  note?: string;
  date?: string;
  completed: boolean;
  priority?: string;
  userId?: string;
}

const useTodos = () => {
  const { addTask, getTasks, deleteTask, updateTask } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const fetchTodos = useCallback(async () => {
    const data = await getTasks();
    setTodos(data);
  }, [getTasks]);

  useEffect(() => {
    fetchTodos();
  }, [getTasks, fetchTodos]);

  const addTodo = async (todo: Todo) => {
    await addTask(todo);
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await deleteTask(id);
    fetchTodos();
  };

  const toggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await updateTask(id, { completed: !todo.completed });
    fetchTodos();
  };

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEdit(true);
  };

  const updateTodo = async (
    id: string,
    newTask: string,
    newDescription: string,
    newDate: string,
    newPriority: string
  ) => {
    await updateTask(id, {
      task: newTask,
      description: newDescription,
      date: newDate,
      priority: newPriority,
    });
    setEditingTodo(null);
    setIsEdit(false);
    fetchTodos();
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
  };
};

export default useTodos;
