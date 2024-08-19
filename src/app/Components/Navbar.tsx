"use client";

import Link from "next/link";
import styles from "../styles/Navbar.module.css";

import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react"; // Importe useEffect e useState

const Navbar = () => {
  const [data, setData] = useState(null); // Estado para armazenar dados assíncronos
  const { userId } = useAuth();

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
        <div className={styles.signIn}>
          {userId ? (
            <div>
              <UserButton />
            </div>
          ) : (
            <div>
              <Link className="marginRight-3" href="sign-in">
                Login
              </Link>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
