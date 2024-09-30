import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TodoProvider } from "./contexts/TodoContext";
import "./App.css";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <TodoProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<TodoList />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
