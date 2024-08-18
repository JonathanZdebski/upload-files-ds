import React from "react";
import Link from "next/link";
import styles from "../styles/button.module.css";
import Image from "next/image";

const uploadoptions = () => {
  return (
    <div className={styles.titleContainer}>
      <Link href="/">
        <div className={styles.linkWrapper}>
          <span className={styles.textWrapper}>
            <span className={styles.titleContainerOne}>Upload Images</span>
            <Image
              src="/gallery.png"
              alt="Upload Image"
              width={25}
              height={25}
              className={styles.image}
            />
          </span>
        </div>
      </Link>
      <Link href="/upload-multi-images">
        <div className={styles.linkWrapper}>
          <span className={styles.textWrapper}>
            <span className={styles.titleContainerTwo}>
              Upload Multi Images
            </span>
            <Image
              src="/upload.png"
              alt="Upload Multi Image"
              width={23}
              height={23}
              className={styles.image}
            />
          </span>
        </div>
      </Link>
      <Link href="/upload-multi-files">
        <div className={styles.linkWrapper}>
          <span className={styles.textWrapper}>
            <span className={styles.titleContainerThree}>
              Upload Multi Files
            </span>
            <Image
              src="/file-lock.png"
              alt="Upload Multi Files"
              width={23}
              height={23}
              className={styles.image}
            />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default uploadoptions;
