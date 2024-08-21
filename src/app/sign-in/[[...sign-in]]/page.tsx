"use client";

import { SignIn } from "@clerk/nextjs";
import Content from "@/app/Components/Content";
import styles from "../../styles/Login.module.css";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import PageTitle from "@/app/Components/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle title="Upload Files DS | Login" />
      <Navbar />
      <div className={styles.signin}>
        <SignIn />
        <Content />
      </div>
      <Footer />
    </>
  );
}
