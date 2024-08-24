import { signOut, auth } from "@/auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "../../styles/ProfilePicture.module.css";

import { useSession } from "next-auth/react";

function ProfilePicture() {
  const { data: session, status } = useSession();

  if (!session) {
    return null; // Ou exiba um ícone de usuário genérico
  }

  return (
    <img
      src={session.user?.image || "/default-profile.png"}
      alt="Profile Picture"
      className={styles.profilepicture}
    />
  );
}

export default ProfilePicture;
