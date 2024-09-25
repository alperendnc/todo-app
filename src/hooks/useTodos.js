import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";

const useTodos = () => {
  return useContext(TodoContext);
};

export default useTodos;
