import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodosProvider } from "./contexts/TodoContext.js";
import { AuthProvider } from "./contexts/UseAuth";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/todo-app">
      <AuthProvider>
        {" "}
        <TodosProvider>
          <App />
        </TodosProvider>
      </AuthProvider>{" "}
    </BrowserRouter>
  </React.StrictMode>
);
