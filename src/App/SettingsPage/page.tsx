import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Container,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
  Paper,
  Collapse,
  InputAdornment,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useSnackbar } from "notistack";
import { useThemeMode } from "src/contexts/ThemeContext";
import { useAuth } from "src/contexts/UseAuth";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SettingsPage = () => {
  const { mode, toggleMode } = useThemeMode();
  const { getUserProfile, currentUser, logOut } = useAuth();
  const [username, setUsername] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getUserProfile().then((profile) => {
      if (profile) {
        setUsername(profile.displayName);
        setEmail(profile.email);
        setAvatar(profile.avatar);
      }
    });
  }, [getUserProfile]);

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

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(getAuth().currentUser!);
      enqueueSnackbar("Account deleted.", { variant: "success" });
      logOut();
    } catch (err: any) {
      enqueueSnackbar(
        err?.code === "auth/requires-recent-login"
          ? "Please re-login and try again."
          : "Account could not be deleted.",
        { variant: "error" }
      );
    }
  };

  const handleChangePassword = async () => {
    if (!currentUser || !currentUser.email) return;
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      enqueueSnackbar("Password changed successfully!", { variant: "success" });
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      enqueueSnackbar(
        err?.code === "auth/wrong-password"
          ? "Current password is incorrect."
          : err?.message || "Password could not be changed.",
        { variant: "error" }
      );
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #232526 0%, #414345 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            background: mode === "dark" ? "#232526" : "#fff",
            color: mode === "dark" ? "#fff" : "#000",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
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
                  background: mode === "dark" ? "#2d2f31" : "#fff",
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
                    {(username?.[0] || "").toUpperCase()}
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
                  value={username || ""}
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
                  InputProps={{}}
                />
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </Box>
            </Box>

            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}
            >
              <Box
                sx={{
                  background: mode === "dark" ? "#232526" : "#fff",
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
                      checked={mode === "dark"}
                      onChange={toggleMode}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {mode === "dark" ? (
                        <Brightness4Icon />
                      ) : (
                        <Brightness7Icon />
                      )}
                      {mode === "dark" ? "Dark Mode" : "Light Mode"}
                    </Box>
                  }
                  sx={{ mb: 2 }}
                />
              </Box>
              <Box
                sx={{
                  background: mode === "dark" ? "#232526" : "#fff",
                  borderRadius: 4,
                  boxShadow: 2,
                  p: 3,
                  minHeight: 180,
                }}
              >
                <Typography variant="h6" mb={2}>
                  Change Password
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                  startIcon={<VpnKeyIcon />}
                  onClick={() => setShowPasswordForm((prev) => !prev)}
                >
                  {showPasswordForm ? "Cancel" : "Change Password"}
                </Button>
                <Collapse in={showPasswordForm}>
                  <Box mt={2} display="flex" flexDirection="column" gap={2}>
                    <TextField
                      label="Current Password"
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle current password visibility"
                              onClick={() => setShowCurrent((show) => !show)}
                              edge="end"
                            >
                              {showCurrent ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="New Password"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle new password visibility"
                              onClick={() => setShowNew((show) => !show)}
                              edge="end"
                            >
                              {showNew ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleChangePassword}
                      disabled={loading || !currentPassword || !newPassword}
                    >
                      {loading ? "Changing..." : "Save New Password"}
                    </Button>
                  </Box>
                </Collapse>
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
