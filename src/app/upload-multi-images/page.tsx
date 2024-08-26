"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "../Components/multi-image-dropzone";
import { useEdgeStore } from "../lib/edgestore";
import Content from "../Components/Content";
import Link from "next/link";
import UploadOptions from "../Components/UploadOptions";
import styles from "../styles/button.module.css";
import { useState, useEffect } from "react";
import Sharesm from "../Components/sharesm";
import PageTitle from "../Components/PageTitle";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Head from "next/head";

export default function Page() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    const expectedPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (password === expectedPassword) {
      setIsLoggedIn(true);
      alert("Access granted!");
    } else {
      alert("Incorrect password!");
    }
  };

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { url: string; name: string }[]
  >([]);
  const [currentFiles, setCurrentFiles] = useState(0);
  const [showReloadButton, setShowReloadButton] = useState(false);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const navegarParaPagina = () => {
    window.location.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReloadButton(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [uploadedFiles]);

  const calculateTotalFileSize = (files: string | any[]) => {
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }
    return totalSize;
  };

  const maxAllowedSizePerUser = 15000000;

  useEffect(() => {
    const totalUsedSpace = calculateTotalFileSize(fileStates);
    console.log(`Espaço total utilizado: ${totalUsedSpace} MB`);
  }, [fileStates]);

  return (
    <>
      <Navbar />
      <PageTitle
        title="Upload Files DS - Fast and Secure File Transfer Without an Account"
        description="Simply select your files to upload or drag and drop them directly into your browser."
      />
      <div className="flex flex-col items-center m-6 gap-2">
        <UploadOptions />

        <>
          <div>
            <h1 style={{ fontSize: "20px" }}>Upload Multi Images</h1>

            <p style={{ textAlign: "center" }}>Max size is 2 MB per file.</p>
            <br />
          </div>

          <MultiFileDropzone
            value={fileStates}
            onChange={(files) => {
              setFileStates(files);
            }}
            onFilesAdded={async (addedFiles) => {
              const totalSize = calculateTotalFileSize(addedFiles);

              if (totalSize > maxAllowedSizePerUser) {
                alert("O tamanho total do upload excede o limite de 15 MB.");
                return;
              }

              if (currentFiles + addedFiles.length <= 5) {
                setFileStates([...fileStates, ...addedFiles]);
                setCurrentFiles(currentFiles + addedFiles.length);
                await Promise.all(
                  addedFiles.map(async (addedFileState) => {
                    try {
                      const res = await edgestore.myMultiImages.upload({
                        file: addedFileState.file,
                        options: {
                          //temporary: true,
                        },
                        onProgressChange: async (progress) => {
                          updateFileProgress(addedFileState.key, progress);
                          if (progress === 100) {
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1000)
                            );
                            updateFileProgress(addedFileState.key, "COMPLETE");
                          }
                        },
                      });

                      const fileName = addedFileState.file.name;
                      setUploadedFiles((prevFiles) => [
                        ...prevFiles,
                        { url: res.url, name: fileName },
                      ]);
                    } catch (err) {
                      updateFileProgress(addedFileState.key, "ERROR");
                    }
                  })
                );
              } else {
                alert("File limit reached: 5 files.");
              }
            }}
          />

          {uploadedFiles.map((fileInfo, index) => (
            <div key={index}>
              <Link
                className={styles.buttonTwo}
                href={fileInfo.url}
                target="_blank"
              >
                <strong>Open File {index + 1}:</strong>{" "}
                <span>{fileInfo.name}</span>
              </Link>
              <br />
            </div>
          ))}

          {showReloadButton && (
            <div className={styles.marginbtn}>
              <button
                className={styles.buttonThree}
                onClick={navegarParaPagina}
              >
                Upload New Files
              </button>
            </div>
          )}
          <Sharesm />
          <div className={styles.share}>
            <p>Fast link compartment</p>
          </div>
        </>

        <div className={styles.mbcontent}>
          <Content />
        </div>
      </div>
      <Footer />
    </>
  );
}
