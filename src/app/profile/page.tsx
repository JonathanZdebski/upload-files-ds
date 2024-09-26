"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogoutButton from "../Components/ui/LogoutButton";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useUserStore } from "../Components/useUserStore";
import PageTitle from "../Components/PageTitle";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [location, setLocation] = useState<string | null>(null); // Novo estado para localização
  const [lastLogin, setLastLogin] = useState<string | null>(null); // Novo estado para último login

  const { name, setName, email, setEmail } = useUserStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session && session.user) {
        const storedName =
          localStorage.getItem("userName") || session.user.name || "";
        const storedEmail =
          localStorage.getItem("userEmail") || session.user.email || "";
        const storedImage =
          localStorage.getItem("userImage") || session.user.image || null;

        setName(storedName);
        setEmail(storedEmail);
        setImagePreview(storedImage);

        try {
          const response = await fetch(`/api/user/${session.user.id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados do usuário");
          }

          const userData = await response.json();
          setIsPremium(userData.hasPaid); // Atualiza o status premium a partir dos dados do banco
          setLocation(userData.location); // Armazena a localização
          setLastLogin(userData.lastLogin); // Armazena o último login
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
    if (imagePreview) {
      localStorage.setItem("userImage", imagePreview);
    }
  }, [name, email, imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      localStorage.setItem("userImage", imageUrl);
    }
  };

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

  const handleSaveImage = async () => {
    if (!session || !session.user || !session.user.id) {
      console.error("Usuário não encontrado ou ID indefinido.");
      return;
    }

    let imageUrl = imagePreview || session.user.image;

    try {
      const response = await fetch(`/api/user/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar o usuário: ${errorMessage}`);
      }

      localStorage.setItem("userImage", imageUrl ?? "");
      setIsEditingImage(false);
    } catch (error) {
      console.error("Error updating image:", error);
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
                src={
                  imagePreview || session.user?.image || "/default-profile.png"
                }
                alt={session.user?.name || "User Profile"}
                className="w-28 h-28 rounded-full border-2 border-gray-300"
              />
              <button
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition whitespace-nowrap"
                onClick={() => setIsEditingImage(true)}
              >
                Edit Image
              </button>
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

          {isEditingImage && (
            <div className="flex flex-col items-center mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-2"
              />
              <div className="flex space-x-2">
                <button onClick={handleSaveImage} className="text-blue-400">
                  Save Image
                </button>
                <button
                  onClick={() => {
                    setIsEditingImage(false);
                    setImagePreview(session.user?.image || null);
                  }}
                  className="text-red-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Novas seções para localização e último login */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white">User Location</h3>
            <p className="text-gray-300">
              {location || "Location not available"}
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-white">Last Login</h3>
            <p className="text-gray-300">{lastLogin || "Not available"}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
