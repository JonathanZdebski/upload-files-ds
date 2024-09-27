import React, { useState, useEffect } from "react";
import LogoutButton from "../../app/Components/ui/LogoutButton";
import Header from "../../app/Components/ui/ProfilePicture";
import { Popover } from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { FaCog } from "react-icons/fa";
import { BiBadge, BiUser } from "react-icons/bi"; // Ícones para status da conta

type UserData = {
  name: string;
  email: string;
  hasPaid?: boolean;
  location?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
};

const PopoverProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        try {
          const response = await fetch(`/api/user/${session.user.id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados do usuário");
          }

          const data: UserData = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status !== "authenticated") {
    return null;
  }

  const accountType = userData?.hasPaid ? "Premium" : "Free";
  const accountTypeClass = userData?.hasPaid
    ? "bg-blue-100 text-blue-600"
    : "bg-gray-100 text-gray-600";
  const accountIcon = userData?.hasPaid ? (
    <BiBadge className="inline mr-1" />
  ) : (
    <BiUser className="inline mr-1" />
  );

  return (
    <div className="">
      <Popover>
        <div className="flex items-center p-4 border-b border-gray-200 rounded-lg">
          <span className="mr-2">
            <Header />
          </span>
          <span className="font-semibold text-gray-800 text-sm md:text-base">
            Welcome, {userData?.name || session.user?.name}
          </span>
        </div>

        <div className="border-b border-gray-300"></div>

        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4">
            {userData?.email || session.user?.email}
          </p>
          <div className="border-b border-gray-300 mb-2"></div>
        </div>

        <div className="flex items-center p-4 border-b border-gray-300 -mt-6">
          <FaCog className="mr-2 text-xl text-gray-600 hover:text-blue-600 transition duration-200" />
          <a
            href="/profile"
            className="text-gray-800 hover:text-blue-600 transition duration-200 font-medium text-sm"
          >
            Manage Account
          </a>
        </div>

        <div className="flex justify-center items-center p-4">
          <div
            className={`flex items-center p-3 rounded-md ${accountTypeClass} -mb-5 transition duration-200 hover:shadow-lg`}
          >
            {accountIcon}
            <span className="font-medium text-sm">
              Account Type: <strong>{accountType}</strong>
            </span>
          </div>
        </div>

        <div className="flex justify-center p-2">
          <button className=" text-white font-semibold py-2 px-2 rounded-md transition duration-200">
            <LogoutButton />
          </button>
        </div>
      </Popover>
    </div>
  );
};

export default PopoverProfile;
