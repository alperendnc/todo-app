import { useState } from "react";
import useTodos from "../hooks/useTodos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faStickyNote,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ todo }) => {
  const { setIsEdit, setEditingTodo, toggleTodo, deleteTodo } = useTodos();
  const [showPopup, setShowPopup] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  if (!todo) {
    return null;
  }

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowDate(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setEditingTodo(todo);
    setShowPopup(false);
  };

  const handleShowDate = () => {
    setShowDate(true);
  };

  const fullText = todo.task;
  const truncatedText =
    fullText.length > 20 ? fullText.slice(0, 20) + "..." : fullText;

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const fullDescription = todo.description || "";
  const truncatedDescription =
    fullDescription.length > 20
      ? fullDescription.slice(0, 20) + "..."
      : fullDescription;

  const toggleDescription = () => {
    setIsDescExpanded(!isDescExpanded);
  };

  return (
    <ul>
      <li
        className={`todo-item ${
          todo.completed ? "completed" : "not-completed"
        }`}
      >
        <span onClick={() => toggleTodo(todo.id)}>
          {isExpanded ? fullText : truncatedText}
        </span>
        {fullText.length > 20 && (
          <span className="show-more" onClick={toggleText}>
            {isExpanded ? "Daha az" : "daha fazla"}
          </span>
        )}

        {todo.description && (
          <>
            <span className="todo-description">
              {isDescExpanded ? fullDescription : truncatedDescription}
            </span>
            {fullDescription.length > 20 && (
              <span className="show-more" onClick={toggleDescription}>
                {isDescExpanded ? "Daha az" : "Daha fazla"}
              </span>
            )}
          </>
        )}

        <div className="actions">
          <button onClick={handleShowDate}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
          <button onClick={handleShowPopup}>
            <FontAwesomeIcon icon={faStickyNote} />
          </button>
          <button onClick={() => handleEdit()}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => deleteTodo(todo.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </li>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Note</h2>
            <p>{todo.note || "No note available"}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {showDate && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Date</h2>
            <p>{todo.date || "No date available"}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </ul>
  );
};

export default TodoItem;
