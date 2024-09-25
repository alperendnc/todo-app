import React from "react";
import { TodoProvider } from "./contexts/TodoContext";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
