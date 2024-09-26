"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogoutButton from "../Components/ui/LogoutButton";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useUserStore } from "../Components/useUserStore";
import PageTitle from "../Components/PageTitle";
import { useRouter } from "next/navigation"; // Importar useRouter

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const { name, setName, email, setEmail } = useUserStore();
  const router = useRouter(); // Inicializar useRouter

  const loadStoredUserData = () => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (session && session.user) {
        loadStoredUserData();

        try {
          const response = await fetch(`/api/user/${session.user.id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados do usuário");
          }

          const userData = await response.json();
          setIsPremium(userData.hasPaid);
          setLocation(userData.location);
          setLastLogin(userData.lastLogin);
          setCreatedAt(new Date(userData.createdAt).toLocaleString("pt-BR"));
          setUpdatedAt(new Date(userData.updatedAt).toLocaleString("pt-BR"));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session, setName, setEmail]);

  useEffect(() => {
    if (name) {
      localStorage.setItem("userName", name);
    }
    if (email) {
      localStorage.setItem("userEmail", email);
    }
  }, [name, email]);

  const handleSaveName = async () => {
    if (!session || !session.user || !session.user.id) {
      console.error("Usuário não encontrado ou ID indefinido.");
      return;
    }

    try {
      const response = await fetch(`/api/user/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar o usuário: ${errorMessage}`);
      }

      localStorage.setItem("userName", name);
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session || !session.user) {
    return <div>Access Denied</div>;
  }

  return (
    <>
      <PageTitle title="Upload Files DS | My Profile" />
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-gray-800 bg-opacity-75 shadow-md rounded-lg p-12 w-full max-w-2xl">
          <div className="flex items-center mb-4 relative">
            <div className="relative">
              <img
                src={session.user?.image || "/default-profile.png"}
                alt={session.user?.name || "User Profile"}
                className="w-28 h-28 rounded-full border-2 border-gray-300"
              />
            </div>

            <div className="ml-4 flex-grow">
              {isEditingName ? (
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-700 text-white rounded p-1 mb-2 w-full"
                    placeholder="Name"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveName}
                      className="text-blue-400 mt-2"
                    >
                      Save Name
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setName(session.user?.name || "");
                      }}
                      className="text-red-400 mt-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl text-white">{name}</h2>
                  <p className="text-gray-300">{email}</p>
                  <p className="text-green-400">
                    {isPremium ? "Premium Account" : "Free Account"}
                  </p>
                  <button
                    className="text-blue-400"
                    onClick={() => setIsEditingName(true)}
                  >
                    Edit Name
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-2">
            <h3 className="text-lg font-semibold text-white">Last Login</h3>
            <p className="text-gray-300">
              {lastLogin
                ? new Date(lastLogin).toLocaleString("pt-BR")
                : "Last login not available"}
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-white">Created At</h3>
            <p className="text-gray-300">
              {createdAt || "Created at not available"}
            </p>
          </div>

          {/* Botões condicional baseado no status da conta */}
          <div className="mt-4 flex justify-center space-x-4">
            {isPremium ? (
              <>
                <button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600"
                  onClick={() => router.push("/upload-multi-files")} // Botão para "Upload Multi Files"
                >
                  Upload Multi Files
                </button>
                <button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600"
                  onClick={() =>
                    window.open(
                      "https://billing.stripe.com/p/login/9AQ8xm5gn09keR2288",
                      "_blank"
                    )
                  } // Mudar para a rota do dashboard
                >
                  Subscription Dashboard
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600"
                onClick={() => router.push("/upload-multi-files")}
              >
                Change My Account Plan
              </button>
            )}
          </div>
        </div>
        <LogoutButton />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
