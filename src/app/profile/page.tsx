"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogoutButton from "../Components/ui/LogoutButton";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useUserStore } from "../Components/useUserStore";
import PageTitle from "../Components/PageTitle";
import { useRouter } from "next/navigation";
import Content from "../Components/Content";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  // Novos campos
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const { name, setName, email, setEmail } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        try {
          const response = await fetch(`/api/user/${session.user.id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados do usuário");
          }

          const userData = await response.json();
          setName(userData.name || session.user.name);
          setEmail(userData.email || session.user.email);
          setIsPremium(userData.hasPaid);
          setLocation(userData.location);
          setLastLogin(new Date(userData.lastLogin).toLocaleString("en-US"));
          setBirthDate(new Date(userData.birthDate).toLocaleString("en-US"));
          setPhoneNumber(userData.phoneNumber);
          setGender(userData.gender);
          setCreatedAt(new Date(userData.createdAt).toLocaleString("en-US"));
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

  // Função para salvar apenas o nome
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
        body: JSON.stringify({ name }), // Somente o nome
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar o nome do usuário: ${errorMessage}`);
      }

      localStorage.setItem("userName", name);
      setIsEditingName(false); // Fechar edição de nome
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  // Função para salvar as informações pessoais
  const handleSaveInfo = async () => {
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
        body: JSON.stringify({ birthDate, phoneNumber, gender }), // Somente as informações pessoais
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao atualizar o usuário: ${errorMessage}`);
      }

      setIsEditingInfo(false); // Fechar edição de informações
    } catch (error) {
      console.error("Error updating user info:", error);
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
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
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
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={handleSaveName}
                      className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white px-4 py-2 rounded shadow-md"
                    >
                      Save Name
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setName(session.user?.name || "");
                      }}
                      className="bg-red-600 hover:bg-red-500 transition duration-300 text-white px-4 py-2 rounded shadow-md"
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
                    className="text-blue-400 hover:text-blue-300 transition duration-300"
                    onClick={() => setIsEditingName(true)}
                  >
                    Edit Name
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditingInfo ? (
            <>
              {/* Campos editáveis */}
              <div className="mt-2">
                <label className="text-lg font-semibold text-white">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate || ""}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-gray-700 text-white rounded p-1 w-full"
                />
              </div>
              <div className="mt-2">
                <label className="text-lg font-semibold text-white">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber || ""}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-700 text-white rounded p-1 w-full"
                />
              </div>
              <div className="mt-2">
                <label className="text-lg font-semibold text-white">
                  Gender
                </label>
                <select
                  value={gender || ""}
                  onChange={(e) => setGender(e.target.value)}
                  className="bg-gray-700 text-white rounded p-1 w-full"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleSaveInfo}
                  className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white px-4 py-2 rounded shadow-md"
                >
                  Save Info
                </button>
                <button
                  onClick={() => setIsEditingInfo(false)}
                  className="bg-red-600 hover:bg-red-500 transition duration-300 text-white px-4 py-2 rounded shadow-md"
                >
                  Cancel
                </button>
              </div>

              {/* Linha de separação */}
              <hr className="my-4 border-gray-600" />
            </>
          ) : (
            <>
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-white">Birth Date</h3>
                <p className="text-gray-300">
                  {birthDate
                    ? new Date(birthDate).toLocaleDateString("pt-BR")
                    : "Not provided"}
                </p>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-white">
                  Phone Number
                </h3>
                <p className="text-gray-300">{phoneNumber || "Not provided"}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-white">Gender</h3>
                <p className="text-gray-300">
                  {gender
                    ? gender.charAt(0).toUpperCase() + gender.slice(1)
                    : "Not provided"}
                </p>
              </div>
              <button
                className="text-blue-400 mt-2 hover:text-blue-300 transition duration-300"
                onClick={() => setIsEditingInfo(true)}
              >
                Edit Info
              </button>
            </>
          )}
          <hr className="my-4 border-gray-600" />
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-white">Last Login</h3>
            <p className="text-gray-300">{lastLogin || "Not available"}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-white">Created At</h3>
            <p className="text-gray-300">{createdAt || "Not available"}</p>
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            {isPremium ? (
              <>
                <button
                  className="bg-blue-500 text-white rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:shadow-lg hover:scale-105"
                  onClick={() => router.push("/upload-multi-files")}
                >
                  <span className="font-semibold">Upload Multi Files</span>
                </button>
                <button
                  className="bg-blue-500 text-white rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:shadow-lg hover:scale-105"
                  onClick={() =>
                    window.open(
                      "https://billing.stripe.com/p/login/9AQ8xm5gn09keR2288",
                      "_blank"
                    )
                  }
                >
                  <span className="font-semibold">Subscription Dashboard</span>
                </button>
              </>
            ) : (
              <button
                className="bg-yellow-600 text-white rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform hover:bg-yellow-500 hover:shadow-lg hover:scale-105"
                onClick={() => router.push("/upload-multi-files")}
              >
                <span className="font-semibold">Change My Account Plan</span>
              </button>
            )}
          </div>
        </div>

        <LogoutButton />
      </div>
      <Content />
      <Footer />
    </>
  );
};

export default ProfilePage;
