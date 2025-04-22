import { useEffect, useState } from "react";
import useTodos, { Todo } from "../../hooks/useTodos";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TextField, Button, Box, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const TodoListPage = () => {
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
      setTask({
        ...editingTodo,
        id: editingTodo.id ?? "",
      });
      if (editingTodo.note) setShowNoteInput(true);
      if (editingTodo.date) setShowDateInput(true);
    }
  }, [editingTodo, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingTodo?.id ?? uuidv4();
    addTodo({ ...task, id });
    setTask(defaultValues);
    setShowNoteInput(false);
    setShowDateInput(false);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setTask({ ...task, date: dayjs(date).format("YYYY-MM-DD") });
    }
  };

  return (
    <Box
      component="form"
      className="todo-form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Enter task"
        value={task.task}
        onChange={(e) => setTask({ ...task, task: e.target.value })}
        fullWidth
        required
      />

      <TextField
        label="Enter description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        fullWidth
        multiline
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => setShowDateInput(!showDateInput)}>
          <CalendarTodayIcon />
        </IconButton>

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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>{dayjs(task.date).format("MMMM D, YYYY")}</span>
            </Box>
          )
        )}
      </Box>

      <Button
        variant="outlined"
        onClick={() => setShowNoteInput(!showNoteInput)}
      >
        {showNoteInput ? "Hide Note" : "Add Note"}
      </Button>

      {showNoteInput && (
        <TextField
          label="Enter Note"
          value={task.note}
          onChange={(e) => setTask({ ...task, note: e.target.value })}
          fullWidth
          multiline
        />
      )}

      <Button variant="contained" type="submit">
        {isEdit ? "Edit Task" : "Add Task"}
      </Button>
    </Box>
  );
};

export default TodoListPage;
