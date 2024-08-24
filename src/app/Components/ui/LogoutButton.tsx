// src/components/LogoutButton.jsx
import { signOut } from "next-auth/react";

import { LogOutIcon } from "lucide-react";

function LogoutButton() {
  return (
    <button
      className="flex items-center bg-slate-100 hover:bg-slate-200 text-black px-4 py-2 rounded mt-4"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOutIcon className="w-4 mr-1" />
      Logout
    </button>
  );
}

export default LogoutButton;
