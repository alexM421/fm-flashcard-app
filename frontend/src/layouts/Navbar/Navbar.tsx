import styles from "./Navbar.module.css";

import NavbarButton from "./NavbarButton";

export default function Navbar() {
  return (
    <nav className={styles["navbar"]}>
      <img src="/assets/images/logo-large.svg" alt="flashcard logo" />
      <NavbarButton />
    </nav>
  );
}
