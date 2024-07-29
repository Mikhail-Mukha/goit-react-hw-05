import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={s.div}>
      <p>FilmQuest</p>
      <nav>
        <ul className={s.ul}>
          <li>
            {" "}
            <NavLink className={s.navlink} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={s.navlink} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
