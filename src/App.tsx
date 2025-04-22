import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter import edildi
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes";
import Navbar from "./components/Navbar";
import MainPage from "./App/MainPage/page";
import TodoListPage from "./App/TodoListPage/page";
import NotesPage from "./App/NotesPage/page";
import CalendarPage from "./App/CalendarPage/page";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {" "}
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/todos" element={<TodoListPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
