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
              src="/gallery.png" // Caminho para a sua imagem
              alt="Upload Image"
              width={25} // Largura da imagem
              height={25} // Altura da imagem
              className={styles.image} // Classe CSS opcional para estilização
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
              src="/upload.png" // Caminho para a sua imagem
              alt="Upload Multi Image"
              width={23} // Largura da imagem
              height={23} // Altura da imagem
              className={styles.image} // Classe CSS opcional para estilização
            />
          </span>
        </div>
      </Link>
      <Link href="/upload-multi-files">
        <div className={styles.linkWrapper}>
          <span className={styles.textWrapper}>
            <span className={styles.titleContainerThree}>
              Upload Multi Files (Premium)
            </span>
            <Image
              src="/file-lock.png" // Caminho para a sua imagem
              alt="Upload Multi Files"
              width={23} // Largura da imagem
              height={23} // Altura da imagem
              className={styles.image} // Classe CSS opcional para estilização
            />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default uploadoptions;
