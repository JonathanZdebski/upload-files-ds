import { SignIn } from "@clerk/nextjs";
import Content from "@/app/Components/Content";
import styles from "../../styles/Login.module.css";

export default function Page() {
  return (
    <div className={styles.signin}>
      <SignIn />
      <Content />
    </div>
  );
}
