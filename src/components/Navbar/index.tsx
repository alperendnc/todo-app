import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#212121",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            ml: 4,
            mt: 1,
            fontWeight: "bold",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Todo App
        </Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <Button
            color="inherit"
            component={Link}
            to="/signup"
            sx={{
              marginRight: 1,
              "&:hover": {
                backgroundColor: "#424242",
              },
            }}
          >
            Sign Up
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                backgroundColor: "#424242",
                borderColor: "#ffffff",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
