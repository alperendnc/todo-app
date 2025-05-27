import { useEffect, useState } from "react";
import useTodos, { Todo } from "../../hooks/useTodos";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Snackbar,
  Tabs,
  Tab,
  InputAdornment,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import SearchIcon from "@mui/icons-material/Search";

const TodoListPage = () => {
  const {
    addTodo,
    updateTodo,
    todos,
    editingTodo,
    isEdit,
    startEditing,
    deleteTodo,
    toggleComplete,
  } = useTodos();

  const defaultValues: Todo = {
    id: "",
    task: "",
    description: "",
    date: "",
    completed: false,
    priority: "",
  };

  const [task, setTask] = useState<Todo>(defaultValues);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  useEffect(() => {
    if (isEdit && editingTodo) {
      setTask({ ...editingTodo, id: editingTodo.id ?? "" });
    }
  }, [editingTodo, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && editingTodo) {
      updateTodo(
        editingTodo.id,
        task.task,
        task.description,
        task.date || "",
        task.priority || ""
      );
    } else {
      const id = uuidv4();
      addTodo({ ...task, id });
    }
    setTask(defaultValues);
  };

  const handleToggleComplete = (id: string) => {
    toggleComplete(id);
    const completedTask = todos.find((todo) => todo.id === id);
    if (completedTask?.completed) {
      setSnackbarMessage(`Task "${completedTask.task}" marked as undone!`);
    } else {
      setSnackbarMessage(`Task "${completedTask?.task}" marked as done!`);
    }
    setSnackbarOpen(true);
  };

  const handleTaskClick = (todo: Todo) => {
    setSelectedTask(todo);
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setSelectedTask(null);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.task
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (filter === "done") return todo.completed && matchesSearch;
    if (filter === "todo") return !todo.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <Box
      component="form"
      className="todo-form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        p: 3,
      }}
    >
      <Typography variant="h4">Tasks</Typography>

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

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          "& > *": {
            flex: 1,
            minWidth: 0,
            height: 56,
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiDatePicker
            label="Select a date"
            value={task.date ? dayjs(task.date) : null}
            onChange={(newValue) => {
              setTask({
                ...task,
                date: newValue ? dayjs(newValue).format("YYYY-MM-DD") : "",
              });
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: { minWidth: 0, height: 56 },
                inputProps: {
                  readOnly: true,
                  style: { cursor: "pointer", height: 56 },
                },
              },
            }}
            sx={{ flex: 1, minWidth: 0, height: 56 }}
          />
        </LocalizationProvider>
        <Select
          value={task.priority || "Low"}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value as string })
          }
          fullWidth
          sx={{
            flex: 1,
            minWidth: 0,
            height: 56,
            display: "flex",
            alignItems: "center",
          }}
          displayEmpty
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 200 },
            },
          }}
        >
          <MenuItem value="" disabled>
            <b>Choose priorty</b>
          </MenuItem>
          <MenuItem value="Low">
            <Chip
              label="Low"
              sx={{ backgroundColor: "#81c784", color: "white" }}
            />
          </MenuItem>
          <MenuItem value="Medium">
            <Chip
              label="Medium"
              sx={{ backgroundColor: "#ffd54f", color: "black" }}
            />
          </MenuItem>
          <MenuItem value="High">
            <Chip
              label="High"
              sx={{ backgroundColor: "#e57373", color: "white" }}
            />
          </MenuItem>
        </Select>
      </Box>

      <Button variant="contained" type="submit">
        {isEdit ? "Edit Task" : "Add Task"}
      </Button>

      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Total: {todos.length} | Done: {todos.filter((t) => t.completed).length}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Task Manager
        </Typography>

        <Tabs value={filter} onChange={(e, val) => setFilter(val)}>
          <Tab label="All" value="all" />
          <Tab label="Done" value="done" />
          <Tab label="To Do" value="todo" />
        </Tabs>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: "#fff",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {filteredTodos.length === 0 ? (
            <Typography>No tasks found</Typography>
          ) : (
            filteredTodos.map((todo) => (
              <Box
                key={todo.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingY: 1,
                  borderBottom: "2px solid #ccc",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": {
                    background: "#f0f4ff",
                    boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.08)",
                  },
                }}
                onClick={() => handleTaskClick(todo)}
              >
                <Chip
                  label={todo.priority || "Low"}
                  sx={{
                    backgroundColor:
                      todo.priority === "High"
                        ? "#e57373"
                        : !todo.priority || todo.priority === "Low"
                        ? "#81c784"
                        : "#ffd54f",
                    color: todo.priority === "Medium" ? "black" : "white",
                    mr: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#757575" : "#000",
                    flex: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {todo.task.length > 20
                    ? todo.task.slice(0, 20) + "..."
                    : todo.task}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#9e9e9e" : "#616161",
                    flex: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {todo.description.length > 20
                    ? todo.description.slice(0, 20) + "..."
                    : todo.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#9e9e9e" : "#616161",
                    flex: 2,
                  }}
                >
                  {todo.date ? `📅 ${todo.date}` : "No date available"}
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 1, flex: 1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconButton
                    color="primary"
                    onClick={() => startEditing(todo)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color={todo.completed ? "success" : "default"}
                    onClick={() => handleToggleComplete(todo.id)}
                  >
                    {todo.completed ? <UndoIcon /> : <DoneIcon />}
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Dialog
        open={openTaskDialog}
        onClose={handleCloseTaskDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent dividers>
          {selectedTask && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, wordBreak: "break-word" }}>
                {selectedTask.task}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, wordBreak: "break-word" }}
              >
                {selectedTask.description}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <b>Date:</b> {selectedTask.date ? selectedTask.date : "No date"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default TodoListPage;
