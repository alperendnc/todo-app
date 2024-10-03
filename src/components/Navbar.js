import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarAlt,
  faHome,
  faList,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setFilterType }) => {
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => setFilterType("all")}>
          <FontAwesomeIcon className="nav-icon" icon={faHome} />
          Main Menu
        </li>
        <li onClick={() => setFilterType("today")}>
          <FontAwesomeIcon className="nav-icon" icon={faCalendarDay} />
          Today
        </li>
        <li onClick={() => setFilterType("upcoming")}>
          <FontAwesomeIcon className="nav-icon" icon={faCalendarAlt} />
          Upcoming
        </li>
        <li onClick={() => setFilterType("past")}>
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
