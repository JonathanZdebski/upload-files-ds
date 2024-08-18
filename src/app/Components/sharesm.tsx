import React from "react";
import Link from "next/link";
import styles from "../styles/sharesm.module.css";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const sharesm = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.socialLinksList}>
        <li>
          <Link href="https://web.whatsapp.com/" target="_blank" passHref>
            <FaWhatsapp size={35} className={styles.icon_whatsapp} />
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com" target="_blank" passHref>
            <FaFacebook size={30} className={styles.icon_facebook} />
          </Link>
        </li>
        <li>
          <Link href="https://www.twitter.com" target="_blank" passHref>
            <FaTwitter size={30} className={styles.icon_twitter} />
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com" target="_blank" passHref>
            <FaInstagram size={30} className={styles.icon_instagram} />
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com" target="_blank" passHref>
            <FaLinkedinIn size={30} className={styles.icon_linkedin} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default sharesm;
