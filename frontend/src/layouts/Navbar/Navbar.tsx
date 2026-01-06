import styles from "./Navbar.module.css";

import NavbarButton from "./NavbarButton";

export default function Navbar() {
    return (
        <nav className={styles["navbar"]}>
            <picture>
                <source srcSet="/assets/images/logo-large.svg" media="(min-width: 768px)" />
                <img src="/assets/images/logo-small.svg" alt="flashcard logo" />
            </picture>
            <NavbarButton />
        </nav>
    );
}
