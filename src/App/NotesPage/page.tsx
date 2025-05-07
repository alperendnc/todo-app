import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Fab,
} from "@mui/material";
import { Favorite, FavoriteBorder, Edit, Delete } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  addItem,
  deleteItem,
  updateItem,
  toggleItemField,
} from "../../contexts/TodoContext";

interface Note {
  id: number;
  title: string;
  content: string;
  favorite: boolean;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noteDialog, setNoteDialog] = useState(false);
  const [newNote, setNewNote] = useState<Note>({
    id: Date.now(),
    title: "",
    content: "",
    favorite: false,
  });
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(
    null
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [filter, setFilter] = useState<string>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenAddDialog = () => {
    setSelectedNoteIndex(null);
    setNewNote({ id: Date.now(), title: "", content: "", favorite: false });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNoteDialog(false);
  };

  const handleSaveNote = () => {
    if (selectedNoteIndex !== null) {
      updateItem(notes, setNotes, notes[selectedNoteIndex].id, newNote);
      setSnackbar({ open: true, message: "Note updated!" });
    } else {
      addItem(notes, setNotes, newNote);
      setSnackbar({ open: true, message: "Note added!" });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    deleteItem(notes, setNotes, id);
    setSnackbar({ open: true, message: "Note deleted!" });
  };

  const handleFavorite = (id: number) => {
    toggleItemField(notes, setNotes, id, "favorite");
    const updatedNote = notes.find((note) => note.id === id);
    setSnackbar({
      open: true,
      message: updatedNote?.favorite
        ? "Added to favorites"
        : "Removed from favorites",
    });
  };

  const handleViewNote = (index: number) => {
    setSelectedNoteIndex(index);
    setNewNote(notes[index]);
    setNoteDialog(true);
  };

  const handleEditNote = () => {
    setDialogOpen(true);
    setNoteDialog(false);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesFilter = filter === "liked" ? note.favorite : true;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Notes
      </Typography>

      <Grid container spacing={3}>
        {filteredNotes.map((note, index) => (
          <Grid key={index}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                boxShadow: 3,
                transition: "transform 0.3s",
                height: 150,
                width: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleViewNote(index)}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#000000" }}
                >
                  {note.title.length > 10
                    ? note.title.substring(0, 10) + "..."
                    : note.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575", mt: 1 }}>
                  {note.content.length > 10
                    ? note.content.substring(0, 10) + "..."
                    : note.content}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  pb: 1,
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(note.id);
                  }}
                  sx={{ color: "#000000" }}
                >
                  {note.favorite ? (
                    <Favorite color="error" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
                <Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewNote(index);
                    }}
                    sx={{ color: "#000000" }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    sx={{ color: "#000000" }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedNoteIndex !== null ? "Edit Note" : "Add New Note"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNote} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={noteDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{newNote.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {newNote.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditNote}>Edit</Button>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: "flex",
          gap: 2,
        }}
      >
        <Fab
          color="secondary"
          onClick={() => setFilter(filter === "liked" ? "all" : "liked")}
        >
          <FavoriteIcon />
        </Fab>
        <Fab color="primary" onClick={handleOpenAddDialog}>
          <AddIcon />
        </Fab>
        <Fab color="default" onClick={() => setSearchOpen(!searchOpen)}>
          {searchOpen ? <CloseIcon /> : <SearchIcon />}
        </Fab>
      </Box>

      {searchOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: "300px",
            transition: "width 0.3s ease-in-out",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: 2,
            p: 2,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search notes..."
            variant="outlined"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      )}
    </Box>
  );
};

export default NotesPage;
