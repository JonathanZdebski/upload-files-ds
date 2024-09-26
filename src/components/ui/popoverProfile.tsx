import React from "react";
import { useState } from "react";
import LogoutButton from "../../app/Components/ui/LogoutButton";
import Header from "../../app/Components/ui/ProfilePicture";
import { Popover } from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa"; // Usando ícone de usuário

const PopoverProfile = () => {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div>
      <Popover>
        <h3 className="flex items-center border-b border-gray-200 pb-2 mb-2">
          <span className="mr-2">
            <Header />
          </span>
          <span className="font-semibold text-gray-800">
            Hello, {session.user?.name}
          </span>
        </h3>

        <div className="border-b border-gray-300 mb-2"></div>

        <p className="text-gray-600 pb-2 mb-2">{session.user?.email}</p>

        <div className="border-b border-gray-300 mb-2"></div>

        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-xl text-gray-600 hover:text-blue-600 transition duration-200" />
          <a
            href="/profile"
            className="text-gray-800 hover:text-blue-600 transition duration-200 font-medium"
          >
            Edit Profile
          </a>
        </div>

        <div className="border-b border-gray-300 mb-2"></div>

        <button className="border-gray-300">
          <LogoutButton />
        </button>
      </Popover>
    </div>
  );
};

export default PopoverProfile;
