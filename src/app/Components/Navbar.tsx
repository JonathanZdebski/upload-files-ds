import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useSession } from "next-auth/react";
import Header from "./ui/ProfilePicture";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopoverProfile from "@/components/ui/popoverProfile";

const Navbar = () => {
  const { data: session } = useSession(); // Obtendo dados da sessão

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
        {session ? (
          <li></li>
        ) : (
          <span className={styles.loginstyle}>
            <Link href="/login">Login</Link>
          </span>
        )}
        <Popover>
          <PopoverTrigger>
            <span>
              <Header />
            </span>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverProfile />
          </PopoverContent>
        </Popover>
      </ul>
    </nav>
  );
};

export default Navbar;
