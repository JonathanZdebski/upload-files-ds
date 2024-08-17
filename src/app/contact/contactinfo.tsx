import React from "react";
import Image from "next/image";
import styles from "../styles/Content.module.css";

const contactinfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerquadrado}>
        <div className={styles.quadradointerno}>
          <Image
            src="/chat.png"
            width={150}
            height={150}
            alt="Picture of Contact"
            style={{ marginLeft: "20rem" }}
          />
        </div>
        <div>
          <p className={styles.contactinfo}>
            Offering suggestions to Upload Files DS enhances the cloud storage
            and sharing experience for all users by contributing to
            improvements. This platform prioritizes security, encrypting all
            data transfers with SSL/TLS, and offers a comprehensive File Manager
            for easy folder organization and file sharing. Its commitment to
            data privacy ensures user information remains protected and not
            shared with third parties. Providing feedback helps shape a better,
            more secure cloud sharing environment for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default contactinfo;
