import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { signOut } from "@/auth";
import { useRouter } from "next/navigation"; // Corrigindo a importação do useRouter
import { useState } from "react";
import LogoutButton from "../../app/Components/ui/LogoutButton";
import Header from "../../app/Components/ui/ProfilePicture";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";

const popoverProfile = () => {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();

  if (!session) {
    return null; // Ou exiba um ícone de usuário genérico
  }

  return (
    <div>
      <Popover>
        <h3 className="flex items-center border-b border-gray-300 pb-4 mb-3">
          <span className="mr-2">
            <Header />
          </span>
          Olá, {session.user?.name}
        </h3>

        <p className="border-b border-gray-300 pb-4 mb-1 ">
          {session.user?.email}
        </p>

        <button className=" border-gray-300">
          <LogoutButton />
        </button>
      </Popover>
    </div>
  );
};

export default popoverProfile;
