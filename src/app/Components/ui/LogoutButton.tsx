import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

function LogoutButton() {
  return (
    <button
      className="flex items-center bg-slate-100 hover:bg-slate-300 text-black px-4 py-2 rounded mt-4 transition-all duration-300 ease-in-out"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOutIcon className="w-4 mr-1 transition-transform duration-300 ease-in-out" />
      Logout
    </button>
  );
}

export default LogoutButton;
