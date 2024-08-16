import React from "react";
import Image from "next/image";
import styles from "../styles/Content.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containertitle}>
        <h1 className={styles.title}>
          {" "}
          <strong>ABOUT US</strong>
        </h1>
      </div>
      <div className={styles.containerquadrado}>
        <div className={styles.quadradointerno}>
          <Image
            src="/jhnnn.png"
            width={200}
            height={200}
            alt="Picture of security"
          />

          <p>
            Jonathan Zdebski <br />
            CEO, Web Developer
          </p>
        </div>
        <div className={styles.contactinfocontainer}>
          <p className={styles.contactinfo}>
            "
            <strong>
              With the goal of innovating and renewing technologies available in
              the market,
            </strong>
            we created this project with a special focus on security and the
            privacy of data and files. By choosing Upload Files DS for storage
            or movement of your files, you will benefit from a robustly
            fortified cloud platform. Not only offers logistical and regulatory
            advantages but also reinforces our commitment to strict security
            standards. To ensure the integrity and privacy of data exchanged
            between Upload Files DS and our servers, all transmissions are
            encrypted using SSL/TLS. This additional measure of security helps
            protect your information against unauthorized access and ensures
            that your communications remain confidential. With these advanced
            security practices, we are committed to offering a file storage
            solution that not only meets the modern needs of digitization but
            also forms part of a responsible and secure data management
            strategy. Our integrated approach to security, privacy, and
            efficiency makes Upload Files DS a reliable choice for companies and
            individuals who value the protection of their digital information.
            Together, we can build a future where innovation and security go
            hand in hand."
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
