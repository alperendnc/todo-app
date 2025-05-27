import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  MenuItem,
  Container,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useSnackbar } from "notistack";

const languages = [
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
  { value: "de", label: "Deutsch" },
];

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [username, setUsername] = useState("alper");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [email, setEmail] = useState("alper@example.com");
  const [notifications, setNotifications] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    enqueueSnackbar("Settings saved!", { variant: "success" });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 5,
            p: { xs: 2, sm: 4 },
            mx: "auto",
            maxWidth: 1100,
            background: "#fff",
            minHeight: 600,
          }}
        >
          <Typography variant="h4" mb={2} fontWeight={700} letterSpacing={1}>
            Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}
            >
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: 4,
                  boxShadow: 2,
                  p: 3,
                  minHeight: 340,
                }}
              >
                <Typography variant="h6" mb={2}>
                  Profile
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb={2}
                >
                  <Avatar
                    src={avatar || undefined}
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "#1976d2",
                      fontSize: 36,
                      mb: 1,
                    }}
                  >
                    {username[0]?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload">
                      <Tooltip title="Change Avatar">
                        <IconButton component="span" size="small">
                          <PhotoCamera fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </label>
                  </Box>
                </Box>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon sx={{ mr: 1, color: "#1976d2" }} />
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Delete Account
                </Button>
              </Box>

              <Box
                sx={{
                  background: "#fff",
                  borderRadius: 4,
                  boxShadow: 2,
                  p: 3,
                  minHeight: 180,
                }}
              >
                <Typography variant="h6" mb={2}>
                  Security
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <LockIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Change your password
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                  startIcon={<VpnKeyIcon />}
                >
                  Change Password
                </Button>
              </Box>
            </Box>

            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}
            >
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: 4,
                  boxShadow: 2,
                  p: 3,
                  minHeight: 180,
                }}
              >
                <Typography variant="h6" mb={2}>
                  Appearance
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={() => setDarkMode((prev) => !prev)}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
                      {darkMode ? "Dark Mode" : "Light Mode"}
                    </Box>
                  }
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box
                sx={{
                  background: "#fff",
                  borderRadius: 4,
                  boxShadow: 2,
                  p: 3,
                  minHeight: 180,
                }}
              >
                <Typography variant="h6" mb={2}>
                  Language & Notifications
                </Typography>
                <TextField
                  select
                  label="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={() => setNotifications((prev) => !prev)}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <NotificationsActiveIcon />
                      Enable Notifications
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ minWidth: 180, fontWeight: 600, fontSize: 16 }}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SettingsPage;
