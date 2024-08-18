"use client";

import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["logo-container"]}>
        <img src="/protection.png" alt="Logo" className={styles.logo} />
        <a href="/" className={styles.titleLink}>
          <span className={styles.title}>Upload Files DS</span>
        </a>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
