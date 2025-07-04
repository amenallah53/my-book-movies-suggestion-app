import "../../App.css";
import logo from "../../logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faFilm,
  faTv,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App"; // correct relative path to your App.js

function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="nav-div">
      <nav className="nav-bar">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon icon={faHome} /> home
            </Link>
          </li>
          <li>
            <Link to="" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon icon={faBook} /> books
            </Link>
          </li>
          <li>
            <Link to="" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon icon={faFilm} /> movies
            </Link>
          </li>
          <li>
            <Link to="" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon icon={faTv} /> TV series
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              id="sun-moon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              icon={theme === "light" ? faMoon : faSun}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
