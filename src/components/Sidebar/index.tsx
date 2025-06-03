import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import NoteIcon from "@mui/icons-material/Note";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "src/contexts/ThemeContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  const features = [
    {
      title: "Main Page",
      description: "Return to the main page and access all features.",
      route: "/",
      icon: <MenuIcon />,
    },
    {
      title: "Todo",
      description: "Manage your tasks and stay organized.",
      route: "/todos",
      icon: (
        <CheckCircleIcon sx={{ color: mode === "dark" ? "#fff" : "#1976d2" }} />
      ),
    },
    {
      title: "Notes",
      description: "Store your notes and access them anytime.",
      route: "/notes",
      icon: <NoteIcon sx={{ color: mode === "dark" ? "#fff" : "#1976d2" }} />,
    },
    {
      title: "Calendar",
      description: "Plan by dates and create reminders.",
      route: "/calendar",
      icon: (
        <CalendarTodayIcon
          sx={{ color: mode === "dark" ? "#fff" : "#1976d2" }}
        />
      ),
    },
  ];

  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: mode === "dark" ? "#fff" : "#1976d2",
          zIndex: 1300,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: mode === "dark" ? "#212121" : "#fff",
            color: mode === "dark" ? "#fff" : "#222",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Toolbar
            sx={{
              backgroundColor: mode === "dark" ? "#212121" : "#fff",
              color: mode === "dark" ? "#fff" : "#222",
            }}
          ></Toolbar>
          <List>
            {features.map((feature) => (
              <ListItem key={feature.title} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(feature.route);
                    setOpen(false);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: mode === "dark" ? "#424242" : "#f0f0f0",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: mode === "dark" ? "#fff" : "#1976d2" }}
                  >
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={feature.title}
                    secondary={feature.description}
                    primaryTypographyProps={{
                      color: mode === "dark" ? "#fff" : "#222",
                    }}
                    secondaryTypographyProps={{
                      color: mode === "dark" ? "#bdbdbd" : "#757575",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: mode === "dark" ? "#424242" : "#f0f0f0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: mode === "dark" ? "#fff" : "#1976d2" }}
                >
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  secondary="Adjust your preferences"
                  primaryTypographyProps={{
                    color: mode === "dark" ? "#fff" : "#222",
                  }}
                  secondaryTypographyProps={{
                    color: mode === "dark" ? "#bdbdbd" : "#757575",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
