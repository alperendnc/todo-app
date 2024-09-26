import { useEffect, useState } from "react";
import useTodos from "../hooks/useTodos";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const TodoForm = () => {
  const { addTodo, editingTodo, isEdit } = useTodos();

  const defaultValues = {
    id: "",
    task: "",
    description: "",
    note: "",
    date: "",
    completed: false,
  };

  const [task, setTask] = useState(defaultValues);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setTask(editingTodo);
    }
  }, [editingTodo, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = uuidv4();
    if (isEdit) {
      id = editingTodo.id;
    }
    addTodo({ ...task, id });
    setTask(defaultValues);
    setShowNoteInput(false);
    setShowDateInput(false);
  };

  const handleAddNoteClick = () => {
    setShowNoteInput(!showNoteInput);
  };

  const handleDateChange = (date) => {
    setTask({ ...task, date: dayjs(date).format("YYYY-MM-DD") });
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
