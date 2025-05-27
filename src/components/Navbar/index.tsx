import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "src/contexts/UseAuth";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          {!currentUser ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/SignUp"
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
                to="/logIn"
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
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogout}
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
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
