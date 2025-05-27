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

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      showSnackbar("Kayıt başarılı!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showSnackbar(err.message, "error");
      } else {
        showSnackbar("Bilinmeyen bir hata oluştu.", "error");
      }
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
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
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
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;
