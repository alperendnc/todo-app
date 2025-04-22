import { useEffect, useState } from "react";
import useTodos, { Todo } from "../hooks/useTodos";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const TodoForm = () => {
  const { addTodo, editingTodo, isEdit } = useTodos();

  const defaultValues: Todo = {
    id: "",
    task: "",
    description: "",
    note: "",
    date: "",
    completed: false,
  };

  const [task, setTask] = useState<Todo>(defaultValues);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);

  useEffect(() => {
    if (isEdit && editingTodo) {
      setTask(editingTodo);
      if (editingTodo.note) setShowNoteInput(true);
      if (editingTodo.date) setShowDateInput(true);
    }
  }, [editingTodo, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = isEdit && editingTodo ? editingTodo.id : uuidv4();
    addTodo({ ...task, id });
    setTask(defaultValues);
    setShowNoteInput(false);
    setShowDateInput(false);
  };

  const handleAddNoteClick = () => {
    setShowNoteInput(!showNoteInput);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setTask({ ...task, date: dayjs(date).format("YYYY-MM-DD") });
    } else {
      setTask({ ...task, date: "" });
    }
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          value={task.task}
          onChange={(e) => setTask({ ...task, task: e.target.value })}
          required
        />
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="calendar-icon"
          onClick={() => setShowDateInput(!showDateInput)}
        />
        {showDateInput ? (
          <DatePicker
            selected={task.date ? new Date(task.date) : null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            onClickOutside={() => setShowDateInput(false)}
            autoFocus
          />
        ) : (
          task.date && (
            <span className="date-display">
              {dayjs(task.date).format("MMMM D, YYYY")}
            </span>
          )
        )}
      </div>

      <input
        type="text"
        placeholder="Enter description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <button type="submit">{isEdit ? "Edit Task" : "Add Task"}</button>

      <button type="button" onClick={handleAddNoteClick}>
        {showNoteInput ? "Hide Note" : "Add Note"}
      </button>

      {showNoteInput && (
        <div>
          <input
            type="text"
            placeholder="Enter Note"
            value={task.note}
            onChange={(e) => setTask({ ...task, note: e.target.value })}
          />
        </div>
      )}
    </form>
  );
};

export default TodoForm;
