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
import NoteIcon from "@mui/icons-material/Note";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      title: "Main Page",
      description: "Ana sayfaya dönün ve tüm özelliklere erişin.",
      route: "/",
      icon: <MenuIcon sx={{ color: "white" }} />,
    },
    {
      title: "Todo",
      description: "Yapılacak görevlerinizi yönetin ve düzenli kalın.",
      route: "/todos",
      icon: <CheckCircleIcon sx={{ color: "white" }} />,
    },
    {
      title: "Notes",
      description: "Notlarınızı saklayın ve istediğiniz zaman erişin.",
      route: "/notes",
      icon: <NoteIcon sx={{ color: "white" }} />,
    },
    {
      title: "Calendar",
      description: "Tarihlere göre plan yapın ve hatırlatıcılar oluşturun.",
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
          },
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "#212121",
            color: "white",
          }}
        ></Toolbar>
        <Box sx={{ overflow: "auto" }}>
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
      </Drawer>
    </>
  );
};

export default Sidebar;
