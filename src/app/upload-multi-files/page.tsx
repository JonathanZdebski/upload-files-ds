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
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../Components/PageTitle";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSession } from "next-auth/react";
import ProtectedWrapper from "@/app/protected/ProtectedWrapper";
import Head from "next/head";
import Image from "next/image";

export default function Page() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { url: string; name: string }[]
  >([]);
  const [currentFiles, setCurrentFiles] = useState(0);
  const [showReloadButton, setShowReloadButton] = useState(false);
  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();
  const [showImage, setShowImage] = useState(true);
  const [hasAccessedProtected, setHasAccessedProtected] = useState(false);

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

  useEffect(() => {
    if (hasAccessedProtected) {
      setShowImage(false);
    }
  }, [hasAccessedProtected, session]);

  useEffect(() => {
    if (session && !hasAccessedProtected) {
      setHasAccessedProtected(true);
    }
  }, [session, hasAccessedProtected]);

  const handleCopy = () => {
    toast.success("Image URL copied!");
  };

  return (
    <>
      <Navbar />
      <Link
        href="https://upload-files-ds.vercel.app/upload-multi-files"
        passHref
        rel="nofollow"
      ></Link>
      <title>Upload Files DS - Quick and Secure File Transfers</title>
      <meta
        name="description"
        content="Simple and Secure Global File Sharing, experience seamless and secure file sharing with Upload Files DS."
      />
      <Head>
        <meta
          name="keywords"
          content="file upload, secure file transfer, multi-image upload, free upload service"
        />
        <meta name="author" content="Upload Files DS" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://upload-files-ds.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
        <html lang="en" />
      </Head>
      <div className="flex flex-col items-center m-6 gap-2">
        <UploadOptions />
        <div>
          <h2 style={{ fontSize: "20px", textAlign: "center" }}>
            Upload Multi Files (IMG, PDFs, Docs, Videos)
          </h2>

          <p style={{ textAlign: "center" }}>
            <strong>Your files are permanently saved in the cloud.</strong>
          </p>
          <p style={{ textAlign: "center" }}>
            <strong>Unlimited Uploads.</strong>
          </p>
        </div>
        {showImage && (
          <Image
            className="mt-6 rounded-2xl"
            src="/primg.png"
            width={900}
            height={900}
            alt="secure payment"
          />
        )}
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
            <button className={`${styles.button} flex items-center space-x-2`}>
              <Image
                src="/logo.png"
                alt="Dashboard Icon"
                width={24}
                height={24}
              />
              <Link href="/login">Sign in with Google</Link>
            </button>
            <p className="mt-2">Log in to access Multi Files Upload.</p>
          </div>
        ) : (
          <>
            <h1
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.1rem",
                marginTop: "1.1rem",
              }}
            >
              Multi-File Access
            </h1>
            <ProtectedWrapper>
              <div className={styles.containerlogin}></div>
              <>
                <MultiFileDropzone
                  value={fileStates}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  onFilesAdded={async (addedFiles) => {
                    if (currentFiles + addedFiles.length <= 10) {
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
                      alert("File limit reached: 10 files.");
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
                    <Link href="/upload-multi-files">
                      <button
                        className={styles.buttonThree}
                        onClick={navegarParaPagina}
                      >
                        Upload New Files
                      </button>
                    </Link>
                  </div>
                )}
                <Sharesm />
                <div className={styles.share}>
                  <p>Fast link compartment</p>
                </div>
                {!hasAccessedProtected && setHasAccessedProtected(true)}
              </>
              <div className="mt-2">
                <button className={styles.button}>
                  <Link
                    target="_blank"
                    href="https://billing.stripe.com/p/login/9AQ8xm5gn09keR2288"
                    className="flex items-center space-x-2"
                  >
                    <Image
                      src="/dashboard.png"
                      alt="Dashboard Icon"
                      width={24}
                      height={24}
                    />
                    <span>Subscription Dashboard</span>
                  </Link>
                </button>
              </div>
            </ProtectedWrapper>
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
