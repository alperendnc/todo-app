import { useState } from "react";
import useTodos, { Todo } from "../hooks/useTodos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faStickyNote,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

interface TodoItemProps {
  Todo: Todo;
}

const TodoItem = ({ Todo }: TodoItemProps) => {
  const { toggleComplete, deleteTodo, startEditing } = useTodos();
  const [showPopup, setShowPopup] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  if (!Todo) {
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
    startEditing(Todo); // Burada doğru şekilde 'startEditing' fonksiyonunu çağırdım
    setShowPopup(false);
  };

  const handleShowDate = () => {
    setShowDate(true);
  };

  const fullText = Todo.task;
  const truncatedText =
    fullText.length > 20 ? fullText.slice(0, 20) + "..." : fullText;

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const fullDescription = Todo.description || "";
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
          Todo.completed ? "completed" : "not-completed"
        }`}
      >
        <span onClick={() => toggleComplete(Todo.id)}>
          {isExpanded ? fullText : truncatedText}
        </span>
        {fullText.length > 20 && (
          <span className="show-more" onClick={toggleText}>
            {isExpanded ? "Daha az" : "daha fazla"}
          </span>
        )}

        {Todo.description && (
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
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => deleteTodo(Todo.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </li>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Note</h2>
            <p>{Todo.note || "No note available"}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {showDate && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Date</h2>
            <p>{Todo.date || "No date available"}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </ul>
  );
};

export default TodoItem;
