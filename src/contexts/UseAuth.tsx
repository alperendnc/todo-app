import React, { useContext, createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../config";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  getDocs,
  deleteDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { Todo } from "../hooks/useTodos";

export interface CalendarEvent {
  id?: string;
  day: number;
  month: number;
  year: number;
  title: string;
  userId: string;
}

export interface Note {
  id?: string;
  title: string;
  content: string;
  userId: string;
  favorite: boolean;
  createdAt?: Date;
}

interface AuthContextType {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<any>;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  addTask: (todo: Todo) => Promise<void>;
  getTasks: () => Promise<Todo[]>;
  updateTask: (taskId: string, updatedFields: Partial<Todo>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addNote: (title: string, content: string) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  getNotes: () => Promise<Note[]>;
  addEvent: (event: Omit<CalendarEvent, "id" | "userId">) => Promise<void>;
  getEvents: () => Promise<CalendarEvent[]>;
  deleteEvent: (eventId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DB = getFirestore();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userRef = doc(DB, "users", user.uid);
    await setDoc(userRef, {
      displayName: email.split("@")[0] || "User",
      email,
      createdAt: new Date(),
    });

    return userCredential;
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const addTask = async (todo: Todo) => {
    if (!currentUser) throw new Error("User not logged in");

    const fullTodo: Todo = {
      ...todo,
      completed: todo.completed ?? false,
      date: todo.date || "",
      priority: todo.priority || "",
      userId: currentUser.uid,
    };

    await addDoc(collection(DB, "tasks"), fullTodo);
  };

  const getTasks = async (): Promise<Todo[]> => {
    const q = query(collection(DB, "tasks"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Todo),
      id: doc.id,
    }));
  };

  const deleteTask = async (taskId: string) => {
    await deleteDoc(doc(DB, "tasks", taskId));
  };

  const updateTask = async (taskId: string, updatedFields: Partial<Todo>) => {
    const taskRef = doc(DB, "tasks", taskId);
    await setDoc(taskRef, updatedFields, { merge: true });
  };
  const addNote = async (title: string, content: string) => {
    if (!currentUser) throw new Error("User not logged in");

    const newNote: Note = {
      title,
      content,
      userId: currentUser.uid,
      favorite: false,
      createdAt: new Date(),
    };

    await addDoc(collection(DB, "notes"), newNote);
  };

  const getNotes = async (): Promise<Note[]> => {
    if (!currentUser) throw new Error("User not logged in");

    const q = query(
      collection(DB, "notes"),
      where("userId", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Note),
      id: doc.id,
    }));
  };

  const updateNote = async (note: Note) => {
    if (!currentUser) throw new Error("User not logged in");
    if (!note.id) throw new Error("Note id is required");
    const noteRef = doc(DB, "notes", note.id);
    await setDoc(noteRef, { ...note }, { merge: true });
  };

  const deleteNote = async (noteId: string) => {
    if (!currentUser) throw new Error("User not logged in");
    await deleteDoc(doc(DB, "notes", noteId));
  };

  const addEvent = async (event: Omit<CalendarEvent, "id" | "userId">) => {
    if (!currentUser) throw new Error("User not logged in");
    await addDoc(collection(DB, "events"), {
      ...event,
      userId: currentUser.uid,
    });
  };

  const getEvents = async (): Promise<CalendarEvent[]> => {
    if (!currentUser) throw new Error("User not logged in");
    const q = query(
      collection(DB, "events"),
      where("userId", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as CalendarEvent),
      id: doc.id,
    }));
  };

  const deleteEvent = async (eventId: string) => {
    await deleteDoc(doc(DB, "events", eventId));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        logIn,
        logOut,
        addTask,
        getTasks,
        deleteTask,
        addNote,
        getNotes,
        updateTask,
        updateNote,
        deleteNote,
        addEvent,
        getEvents,
        deleteEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
