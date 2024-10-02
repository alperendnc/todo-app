import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarAlt,
  faHome,
  faList,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <FontAwesomeIcon className="nav-icon" icon={faHome} />
          Main Menu
        </li>
        <li>
          <FontAwesomeIcon className="nav-icon" icon={faCalendarDay} />
          Today
        </li>
        <li>
          <FontAwesomeIcon className="nav-icon" icon={faCalendarAlt} />
          Upcoming
        </li>
        <li>
          <FontAwesomeIcon className="nav-icon" icon={faHistory} />
          Past
        </li>
        <div className="nav-divider"></div>
        <li>
          <FontAwesomeIcon className="nav-icon" icon={faList} />
          New List
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
