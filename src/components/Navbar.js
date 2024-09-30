import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/">
            <FontAwesomeIcon className="nav-icon" icon={faSearch} />
            Ara
          </a>
        </li>
        <li>
          <a href="/bugun">
            <FontAwesomeIcon className="nav-icon" icon={faCalendarDay} />
            Bugün
          </a>
        </li>
        <li>
          <a href="/yaklasan">
            <FontAwesomeIcon className="nav-icon" icon={faCalendarAlt} />
            Yaklaşan
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
