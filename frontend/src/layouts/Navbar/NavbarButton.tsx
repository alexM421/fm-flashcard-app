import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function NavbarButton() {
  const { pathname } = useLocation();

  return (
    <div className={styles["navbar-btn"]}>
      <Link
        className={`text-preset-4-semibold ${pathname === "/study-mode" ? styles["selected"] : ""}`}
        to="/study-mode"
      >
        Study Mode
      </Link>
      <Link
        className={`text-preset-4-semibold ${pathname === "/all-cards" ? styles["selected"] : ""}`}
        to="/all-cards"
      >
        All Cards
      </Link>
    </div>
  );
}
