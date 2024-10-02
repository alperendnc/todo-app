import React from "react";
import { TodoProvider } from "./contexts/TodoContext";
import "./App.css";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <TodoProvider>
      <Navbar />
      <div className="App">
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
