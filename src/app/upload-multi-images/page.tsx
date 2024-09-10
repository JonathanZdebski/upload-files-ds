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
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for toastify

export default function Page() {
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

  const handleCopy = () => {
    toast.success("Image URL copied!");
  };

  return (
    <>
      <Navbar />
      <head>
        <title>
          Upload Files DS - Fast and Secure File Transfer Without an Account
        </title>
        <meta
          name="description"
          content="Simply select your files to upload or drag and drop them directly into your browser."
        />
      </head>
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

          <span className="mb-1"></span>
          {uploadedFiles.map((fileInfo, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-500"
            >
              <Link
                className="flex-1 hover:underline"
                href={fileInfo.url}
                target="_blank"
              >
                <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition duration-300">
                  <strong>Open</strong>
                  <span className="ml-1">{fileInfo.name}</span>
                </button>
              </Link>
              <CopyToClipboard text={fileInfo.url} onCopy={handleCopy}>
                <button className="bg-blue-900 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition duration-300">
                  <strong>Copy</strong>
                </button>
              </CopyToClipboard>
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
      <ToastContainer />
    </>
  );
}
