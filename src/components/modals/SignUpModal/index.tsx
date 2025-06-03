import React, { useState } from "react";
import { useAuth } from "src/contexts/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useThemeMode } from "src/contexts/ThemeContext";

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      showSnackbar("Sign up successful!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showSnackbar(err.message, "error");
      } else {
        showSnackbar("An unknown error occurred.", "error");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: mode === "dark" ? "#2d2f31" : "white",
            textAlign: "center",
            color: mode === "dark" ? "#fff" : "#000",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={600}
            sx={{ color: mode === "dark" ? "#fff" : "#000" }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body1"
            color={mode === "dark" ? "#bdbdbd" : "text.secondary"}
            mb={3}
          >
            Sign up to get started
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                style: { color: mode === "dark" ? "#fff" : "#000" },
              }}
              InputLabelProps={{
                style: { color: mode === "dark" ? "#bdbdbd" : undefined },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: mode === "dark" ? "#444" : undefined,
                  },
                  "&:hover fieldset": {
                    borderColor: mode === "dark" ? "#90caf9" : undefined,
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style: { color: mode === "dark" ? "#fff" : "#000" },
              }}
              InputLabelProps={{
                style: { color: mode === "dark" ? "#bdbdbd" : undefined },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: mode === "dark" ? "#444" : undefined,
                  },
                  "&:hover fieldset": {
                    borderColor: mode === "dark" ? "#90caf9" : undefined,
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<PersonAddIcon />}
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                backgroundColor: "#1976d2",
                ":hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" mt={3}>
            Already have an account?{" "}
            <Link
              to="/logIn"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: 500,
              }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            background: mode === "dark" ? "#232526" : undefined,
            color: mode === "dark" ? "#fff" : undefined,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;
