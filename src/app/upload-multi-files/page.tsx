"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "../Components/multi-file-dropzone";
import { useEdgeStore } from "../lib/edgestore";
import Content from "../Components/Content";
import Link from "next/link";
import UploadOptions from "../Components/UploadOptions";
import styles from "../styles/button.module.css";
import Sharesm from "../Components/sharesm";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../Components/PageTitle";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSession } from "next-auth/react";

export default function Page() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;
    if (password === PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Access granted!");
    } else {
      toast.error("Incorrect password!");
    }
  };

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { url: string; name: string }[]
  >([]);
  const [currentFiles, setCurrentFiles] = useState(0);
  const [showReloadButton, setShowReloadButton] = useState(false);
  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();

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

  const maxAllowedSizePerUser = 15000000; // 15 MB

  useEffect(() => {
    const totalUsedSpace = calculateTotalFileSize(fileStates);
    console.log(`Espaço total utilizado: ${totalUsedSpace} MB`);
  }, [fileStates]);

  return (
    <>
      <Navbar />

      <PageTitle
        title="Upload Files DS - Quick and Secure File Transfers"
        description="Simple and Secure Global File Sharing, experience seamless and secure file sharing with Upload Files DS."
      />
      <div className="flex flex-col items-center m-6 gap-2">
        <UploadOptions />
        <div>
          <h1 style={{ fontSize: "20px" }}>
            Upload Multi Files (IMG, PDFs, Docs, Videos)
          </h1>

          <p style={{ textAlign: "center" }}>
            <strong>Your files are permanently saved in the cloud.</strong>
          </p>
          <p style={{ textAlign: "center" }}>
            <strong>Unlimited Uploads.</strong>
          </p>
          <br />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {!session ? (
          <div className={styles.containerlogin}>
            <h1>Multi-File Login Access</h1>

            <button className={styles.button}>
              <Link href="/login">Sign in with Google</Link>
            </button>
            <p>Log in to access Multi Files Upload.</p>
          </div>
        ) : (
          <>
            {!isLoggedIn ? (
              <div className={styles.containerlogin}>
                <h1>Multi-File Login Access</h1>
                <input
                  type="password"
                  placeholder="Enter the password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  className={styles.inputField}
                />
                <button onClick={handleLogin} className={styles.button}>
                  Login
                </button>
                <Link
                  href="https://buy.stripe.com/00gbMJ1HF3dT4KYfYZ"
                  passHref
                  target="_blank"
                >
                  <button className={styles.button}>
                    <img
                      src="crown.png"
                      alt="Vip"
                      width="30"
                      height="30"
                      style={{ display: "inline-block", marginRight: "10px" }}
                    />
                    Get Access Key
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <MultiFileDropzone
                  value={fileStates}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  onFilesAdded={async (addedFiles) => {
                    const totalSize = calculateTotalFileSize(addedFiles);
                    if (totalSize > maxAllowedSizePerUser) {
                      alert("");
                      return;
                    }

                    if (currentFiles + addedFiles.length <= 5) {
                      setFileStates([...fileStates, ...addedFiles]);
                      setCurrentFiles(currentFiles + addedFiles.length);
                      await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                          try {
                            const res = await edgestore.myMultiFiles.upload({
                              file: addedFileState.file,

                              onProgressChange: async (progress) => {
                                updateFileProgress(
                                  addedFileState.key,
                                  progress
                                );
                                if (progress === 100) {
                                  await new Promise((resolve) =>
                                    setTimeout(resolve, 1000)
                                  );
                                  updateFileProgress(
                                    addedFileState.key,
                                    "COMPLETE"
                                  );
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
            )}
          </>
        )}
        <div className={styles.mbcontent}>
          <Content />
        </div>
      </div>
      <Footer />
    </>
  );
}
