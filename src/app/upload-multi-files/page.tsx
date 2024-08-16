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
import { useState, useEffect } from "react";

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
  const [showReloadButton, setShowReloadButton] = useState(false); // Estado para controlar a visibilidade do botão de recarga
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
    // Aguarda 5 segundos antes de atualizar o estado para mostrar o botão de recarga
    const timer = setTimeout(() => {
      setShowReloadButton(true);
    }, 8000);

    // Limpa o temporizador se o componente for desmontado ou se os arquivos forem carregados antes do tempo
    return () => clearTimeout(timer);
  }, [uploadedFiles]); // Dependência para limpar o temporizador se os arquivos forem carregados

  // Função para calcular o tamanho total dos arquivos
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
    <div className="flex flex-col items-center m-6 gap-2">
      <UploadOptions />
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
            className={styles.inputField} // Aplicando estilo
          />
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
        </div>
      ) : (
        <>
          <div>
            <h1 style={{ fontSize: "20px" }}>
              Upload Multi Files (IMG, PDF, Documents)
            </h1>

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
                return; // Cancela o upload
              }

              if (currentFiles + addedFiles.length <= 5) {
                setFileStates([...fileStates, ...addedFiles]);
                setCurrentFiles(currentFiles + addedFiles.length);
                await Promise.all(
                  addedFiles.map(async (addedFileState) => {
                    try {
                      const res = await edgestore.myMultiFiles.upload({
                        file: addedFileState.file,
                        options: {
                          temporary: true,
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
                alert("Limite de 5 arquivos alcançado.");
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
        </>
      )}
      <div className={styles.mbcontent}>
        <Content />
      </div>
    </div>
  );
}
