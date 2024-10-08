"use client";

import { useState } from "react";
import { useEdgeStore } from "./lib/edgestore";
import { SingleImageDropzone } from "./Components/single-image-dropzone";
import styles from "./styles/button.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import Sharesm from "./Components/sharesm";
import Content from "./Components/Content";
import UploadOptions from "./Components/UploadOptions";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const [storedPasswords, setStoredPasswords] = useState<{
    [key: string]: string;
  }>({});

  const [shouldReload, setShouldReload] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  function handleCopy() {
    toast.success("Image URL copied!");
  }

  return (
    <>
      <Navbar />
      <title>Upload Files DS - Effortless and Secure File Sharing</title>
      <meta
        name="description"
        content="Share your files, photos, and videos worldwide with ease and security. No account needed. Start sharing today for free."
      />
      <div className="flex flex-col items-center m-6 gap-2">
        <UploadOptions />
        <div>
          <h2 style={{ fontSize: "20px" }}>Upload One Image at a Time</h2>

          <p style={{ textAlign: "center" }}>Max size is 2 MB per file.</p>
          <br />
        </div>
        <SingleImageDropzone
          width={200}
          height={200}
          value={file || ""}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 2,
          }}
          onChange={(file) => {
            if (file === null || file === undefined) {
              setFile(null);
            } else {
              setFile(file);
            }
          }}
        />

        <div className="h-[10px] w-44 border rounded overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-150"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <button
          className={styles.button}
          onClick={async () => {
            if (file) {
              const res = await edgestore.myPublicImages.upload({
                file,
                options: {
                  //temporary: true,
                },
                input: { type: "post" },
                onProgressChange: (progress) => {
                  setProgress(progress);
                },
              });
              setUrls({
                url: res.url,
                thumbnailUrl: res.thumbnailUrl,
              });
            }
          }}
        >
          Upload
        </button>
        <span className="mb-3"></span>
        {urls?.url && (
          <div className="flex items-center space-x- pb-4 border-b border-gray-500">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition duration-300">
              <Link href={urls.url} target="_blank">
                Open Image
              </Link>
            </button>

            <button className="bg-blue-900 ml-5 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition duration-300">
              <ToastContainer />
              <CopyToClipboard text={urls.url} onCopy={handleCopy}>
                <button>Copy</button>
              </CopyToClipboard>
            </button>
          </div>
        )}
        {urls?.thumbnailUrl && (
          <>
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-500">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition duration-300">
                <Link href={urls.thumbnailUrl} target="_blank">
                  Create Thumbnail
                </Link>
              </button>
              <CopyToClipboard text={urls.thumbnailUrl} onCopy={handleCopy}>
                <button className="bg-blue-900 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition duration-300 m-3">
                  Copy
                </button>
              </CopyToClipboard>
            </div>
            <button className={styles.buttonThree} onClick={reloadPage}>
              Upload New Files
            </button>
            <Sharesm />
            <div className={styles.share}>
              <p>Fast link compartment</p>
            </div>
          </>
        )}
        <Content />
      </div>
      <Footer />
    </>
  );
};

export default Page;
