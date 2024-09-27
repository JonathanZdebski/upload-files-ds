import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/button.module.css";

const UploadOptions = () => {
  return (
    <div className={`${styles.titleContainer} flex space-x-6`}>
      {" "}
      {/* Aumentando o espaço horizontal */}
      <Link href="/">
        <div
          className={`${styles.linkWrapper} group flex items-center p-1 rounded-lg transition-all duration-300 bg-transparent hover:bg-gray-900 hover:scale-105`}
        >
          <Image
            src="/gallery.png"
            alt="Upload Image"
            width={25}
            height={25}
            className={`${styles.image} transition-transform duration-300`}
          />
          <span
            className={`${styles.titleContainerOne} ml-1 text-lg font-normal text-white group-hover:text-white`}
          >
            Upload Images
          </span>
        </div>
      </Link>
      <Link href="/upload-multi-images">
        <div
          className={`${styles.linkWrapper} group flex items-center p-1 rounded-lg transition-all duration-300 bg-transparent hover:bg-gray-900 hover:scale-105`}
        >
          <Image
            src="/upload.png"
            alt="Upload Multi Image"
            width={25}
            height={25}
            className={`${styles.image} transition-transform duration-300`}
          />
          <span
            className={`${styles.titleContainerOne} ml-1 text-lg font-normal text-white group-hover:text-white`}
          >
            Upload Multi Images
          </span>
        </div>
      </Link>
      <Link href="/upload-multi-files">
        <div
          className={`${styles.linkWrapper} group flex items-center p-1 rounded-lg transition-all duration-300 bg-transparent hover:bg-gray-900 hover:scale-105`}
        >
          <Image
            src="/file-lock.png"
            alt="Upload Multi Files"
            width={25}
            height={25}
            className={`${styles.image} transition-transform duration-300`}
          />
          <span
            className={`${styles.titleContainerOne} ml-1 text-lg font-normal text-white group-hover:text-white`}
          >
            Upload Multi Files
          </span>
        </div>
      </Link>
    </div>
  );
};

export default UploadOptions;
