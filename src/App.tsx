import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeModeProvider, useThemeMode } from "src/contexts/ThemeContext";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainPage from "./App/MainPage/page";
import TodoListPage from "./App/TodoListPage/page";
import NotesPage from "./App/NotesPage/page";
import SettingsPage from "./App/SettingsPage/page";
import CalendarPage from "./App/CalendarPage/page";
import SignUp from "./components/modals/SignUpModal";
import Login from "./components/modals/LoginModal/Sign";
import { SnackbarProvider } from "notistack";

const AppContent = () => {
  const { mode } = useThemeMode();
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Box sx={{ display: "flex" }}>
          {!isAuthPage && <Sidebar />}

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              background:
                mode === "dark"
                  ? "linear-gradient(135deg, #232526 0%, #414345 100%)"
                  : "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
              minHeight: "100vh",
            }}
          >
            {!isAuthPage && <Navbar />}

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/todos" element={<TodoListPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

const App = () => (
  <ThemeModeProvider>
    <AppContent />
  </ThemeModeProvider>
);
export default App;
