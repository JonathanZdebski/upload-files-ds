import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { signOut } from "@/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrigindo a importação do useRouter
import { useState } from "react";
import LogoutButton from "./ui/LogoutButton";
import Header from "./ui/ProfilePicture";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopoverProfile from "@/components/ui/popoverProfile";

const Navbar = () => {
  const [data, setData] = useState(null);
  const { data: session } = useSession(); // Obtendo dados da sessão
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redireciona para a página inicial após o logout
  };

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
