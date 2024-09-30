import { useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";
import { v4 as uuidv4 } from "uuid";

const TodoForm = () => {
  const { addTodo, editingTodo, isEdit } = useTodos();
  const defaultValues = {
    id: "",
    task: "",
    description: "",
    completed: false,
  };

  const [task, setTask] = useState(defaultValues);

  useEffect(() => {
    if (isEdit) {
      setTask(editingTodo);
    }
  }, [editingTodo, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.task.trim() === "") {
      return;
    }

    let id = uuidv4();
    if (isEdit) {
      id = editingTodo.id;
    }
    addTodo({ ...task, id });
    setTask(defaultValues);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          value={task.task}
          onChange={(e) => setTask({ ...task, task: e.target.value })}
        />
      </div>
      <input
        type="text"
        placeholder="Enter description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <button type="submit">{isEdit ? "Edit Task" : "Add Task"}</button>
    </form>
  );
};

export default TodoForm;
