import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box, CssBaseline } from "@mui/material";
import theme from "./themes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainPage from "./App/MainPage/page";
import TodoListPage from "./App/TodoListPage/page";
import NotesPage from "./App/NotesPage/page";
import CalendarPage from "./App/CalendarPage/page";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex" }}>
          <Sidebar />

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
            }}
          >
            <Navbar />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/todos" element={<TodoListPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
