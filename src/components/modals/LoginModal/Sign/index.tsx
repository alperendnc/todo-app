import { useState } from "react";
import { useAuth } from "src/contexts/UseAuth";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      showSnackbar("Login successful!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const error = err as Error;
      showSnackbar(error.message, "error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Please enter your credentials to login.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<LoginIcon />}
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
              Log In
            </Button>
          </form>

          <Typography variant="body2" mt={3}>
            Don’t have an account?{" "}
            <Link
              to="/SignUp"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: 500,
              }}
            >
              Sign Up
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
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
