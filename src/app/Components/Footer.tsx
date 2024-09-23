import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footercontainer}>
      <div className={styles.footer}>
        <div className={styles.footerText}>
          <p>©2024 Upload Files DS. All rights reserved.</p>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerImage}>
          <Link
            href="https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ssl-certificate.png"
              alt="Secure website SSL"
              width={220}
              height={220}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
