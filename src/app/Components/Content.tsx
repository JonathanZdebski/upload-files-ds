import React from "react";
import Image from "next/image";
import styles from "../styles/Content.module.css";

const Content = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerquadrado}>
        <div className={styles.quadradoone}>
          <Image
            src="/file-lock.png"
            width={120}
            height={120}
            alt="Picture of premium"
          />
        </div>
        <div className={styles.contentp}>
          <p>
            <strong>Exclusive Cloud Benefits.</strong> <br />
            <br />
            You can share multiple files, images, PDFs, documents, and videos.
            The easy, fast, and secure way to send your files around the world
            without needing an account. Share your files, photos, and videos
            right now.
          </p>
        </div>
        <div className={styles.quadradoone}>
          <Image
            src="/cyber-security.png"
            width={120}
            height={120}
            alt="Picture of security"
          />
        </div>
        <div className={styles.contentp}>
          <p>
            <strong>Advanced Cloud Security.</strong> <br />
            <br />
            By choosing Upload Files DS to store or move your files, you benefit
            from a securely fortified cloud platform, based in Europe. To
            safeguard the integrity and privacy of data exchanged between Upload
            Files DS and servers, all transmissions are encrypted using SSL/TLS.
          </p>
        </div>
        <div className={styles.quadradotwo}>
          <Image
            src="/documentation.png"
            width={120}
            height={120}
            alt="Picture of security"
          />
        </div>
        <div className={styles.contentp}>
          <p>
            <strong>Powerful File Manager</strong>
            <br />
            <br />
            Create and organize folders, upload your files, specify who to send
            the access link to your folders and files, share them or keep them
            private and inaccessible to internet users.
          </p>
        </div>
        <div className={styles.quadradothree}>
          <Image
            src="/data-security.png"
            width={120}
            height={120}
            alt="Picture of security"
          />
        </div>
        <div className={styles.contentp}>
          <p>
            <strong>Data Privacy</strong>
            <br />
            <br />
            We do not sell or distribute our users' email addresses or personal
            information to third parties. Your personal data is encrypted in
            transit using SSL/TLS (https) and at rest using advanced encryption
            standards, and each encryption key is further encrypted with a set
            of master keys on a regular rotation schedule.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
