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

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      title: "Main Page",
      description: "Return to the main page and access all features.",
      route: "/",
      icon: <MenuIcon sx={{ color: "white" }} />,
    },
    {
      title: "Todo",
      description: "Manage your tasks and stay organized.",
      route: "/todos",
      icon: <CheckCircleIcon sx={{ color: "white" }} />,
    },
    {
      title: "Notes",
      description: "Store your notes and access them anytime.",
      route: "/notes",
      icon: <NoteIcon sx={{ color: "white" }} />,
    },
    {
      title: "Calendar",
      description: "Plan by dates and create reminders.",
      route: "/calendar",
      icon: <CalendarTodayIcon sx={{ color: "white" }} />,
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
          color: "white",
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
            backgroundColor: "#212121",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Toolbar
            sx={{
              backgroundColor: "#212121",
              color: "white",
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
                      backgroundColor: "#424242",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={feature.title}
                    secondary={feature.description}
                    primaryTypographyProps={{ color: "white" }}
                    secondaryTypographyProps={{ color: "gray" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Settings en altta */}
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
                    backgroundColor: "#424242",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  secondary="Adjust your preferences"
                  primaryTypographyProps={{ color: "white" }}
                  secondaryTypographyProps={{ color: "gray" }}
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
