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
import { MdCheckCircle, MdCancel, MdEdit } from "react-icons/md";

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

          const birthDateObject = new Date(userData.birthDate);
          const adjustedBirthDate = new Date(
            Date.UTC(
              birthDateObject.getUTCFullYear(),
              birthDateObject.getUTCMonth(),
              birthDateObject.getUTCDate()
            )
          );
          setBirthDate(
            adjustedBirthDate.toLocaleString("en-US", { timeZone: "UTC" })
          );

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
        <div className="bg-gray-800 bg-opacity-75 shadow-md rounded-lg p-6 sm:p-12 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center mb-4 relative mt-4 sm:mt-[-1.75rem]">
            <div className="relative">
              <img
                src={session.user?.image || "/default-profile.png"}
                alt={session.user?.name || "User Profile"}
                className="w-16 h-16 sm:w-28 sm:h-28 rounded-full border-2 border-gray-300"
              />
            </div>

            <div className="mt-4 sm:mt-0 sm:ml-4 flex-grow text-center sm:text-left">
              {isEditingName ? (
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded-lg p-3 mb-2 w-full border border-gray-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 transition duration-200"
                    placeholder="Name"
                  />
                  <div className="flex space-x-4 mt-2 justify-center sm:justify-start">
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
                <div className="p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-white mb-1">
                    {name}
                  </h2>
                  <p className="text-gray-400 mb-3">{email}</p>

                  <div
                    className={`relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                      isPremium
                        ? "bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white shadow-lg border-2 border-green-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        : "bg-gray-600 text-gray-200 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full ${
                        isPremium ? "animate-glow" : "hidden"
                      }`}
                    />
                    {isPremium ? (
                      <MdCheckCircle className="mr-2" /> // Ícone para Premium
                    ) : (
                      <MdCancel className="mr-2" /> // Ícone para Free
                    )}
                    {isPremium ? "Premium Account" : "Free Account"}
                  </div>

                  <div className="mt-4 flex justify-center sm:justify-start">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold py-1 px-2 rounded-md shadow flex items-center"
                      onClick={() => setIsEditingName(true)}
                    >
                      <MdEdit className="mr-1 text-sm" /> Edit Name
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isEditingInfo ? (
            <>
              {/* Campos editáveis */}
              <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                <div className="mt-2">
                  <label className="text-lg font-semibold text-gray-200">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={birthDate || ""}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded-lg p-3 w-full border border-gray-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 transition duration-200"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-lg font-semibold text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber || ""}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded-lg p-3 w-full border border-gray-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 transition duration-200"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-lg font-semibold text-gray-200">
                    Gender
                  </label>
                  <select
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded-lg p-3 w-full border border-gray-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 transition duration-200"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleSaveInfo}
                    className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Save Info
                  </button>
                  <button
                    onClick={() => setIsEditingInfo(false)}
                    className="bg-red-600 hover:bg-red-500 transition duration-300 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Linha de separação */}
              <hr className="my-4 border-gray-600" />
            </>
          ) : (
            <>
              <div className="mt-2 p-4 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-200">
                  Birth Date
                </h3>
                <p className="text-gray-300">
                  {birthDate
                    ? new Date(birthDate).toLocaleDateString("pt-BR")
                    : "Not provided"}
                </p>
              </div>
              <div className="mt-2 p-4 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-200">
                  Phone Number
                </h3>
                <p className="text-gray-300">{phoneNumber || "Not provided"}</p>
              </div>
              <div className="mt-2 p-4 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-200">Gender</h3>
                <p className="text-gray-300">
                  {gender
                    ? gender.charAt(0).toUpperCase() + gender.slice(1)
                    : "Not provided"}
                </p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold py-1 px-2 rounded-md shadow mt-4 flex items-center mx-auto sm:mx-0"
                onClick={() => setIsEditingInfo(true)}
              >
                <MdEdit className="mr-1 text-sm" /> Edit Info
              </button>
            </>
          )}

          <hr className="my-4 border-gray-600" />

          <div className="mt-4 bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col space-y-4">
              {/* Last Login Section */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Last Login</h3>
                <span
                  className={`text-xs font-medium ${
                    lastLogin ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {lastLogin ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-gray-300 bg-gray-900 rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-md">
                {lastLogin || "Not available"}
              </p>

              {/* Created At Section */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Created At</h3>
                <span
                  className={`text-xs font-medium ${
                    createdAt ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {createdAt ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-gray-300 bg-gray-900 rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-md">
                {createdAt || "Not available"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            {isPremium ? (
              <>
                <button
                  className="relative inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 text-white rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 active:scale-95"
                  onClick={() => router.push("/upload-multi-files")}
                >
                  <span className="font-semibold text-base sm:text-lg tracking-wider">
                    Upload Multi Files
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 blur-md" />
                  <div className="absolute inset-0 rounded-lg border-2 border-white opacity-20" />
                </button>
                <button
                  className="relative inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 text-white rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 active:scale-95"
                  onClick={() =>
                    window.open(
                      "https://billing.stripe.com/p/login/9AQ8xm5gn09keR2288",
                      "_blank"
                    )
                  }
                >
                  <span className="font-semibold text-base sm:text-lg tracking-wider">
                    Subscription Dashboard
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 blur-md" />
                  <div className="absolute inset-0 rounded-lg border-2 border-white opacity-20" />
                </button>
              </>
            ) : (
              <button
                className="relative inline-flex items-center px-6 py-3 text-white rounded-lg bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 active:scale-95"
                onClick={() => router.push("/upload-multi-files")}
              >
                <span className="font-semibold text-lg tracking-wider">
                  Change My Account Plan
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 opacity-30 blur-md" />
                <div className="absolute inset-0 rounded-lg border-2 border-white opacity-20" />
              </button>
            )}
          </div>
        </div>

        <LogoutButton />
        <Content />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
