import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "./ui/ProfilePicture";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopoverProfile from "@/components/ui/popoverProfile";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-transparent text-white w-full p-4 flex justify-between items-center relative ">
      <div className="flex items-center md-text-center">
        <img
          src="/protection.png"
          alt="Logo"
          className="w-12 mr-4 ml-4 mt-2 "
        />
        <a href="/" className="text-lg mt-2 ">
          Upload Files DS
        </a>
      </div>

      {/* Botão de menu para dispositivos móveis */}
      <button
        className="block md:hidden px-3 py-2 border-gray-300 rounded text-gray-300 hover:text-white hover:border-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menu de navegação para desktop */}
      <ul className="hidden md:flex list-none space-x-4 mt-0 items-center">
        <li className="relative group">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
        </li>
        <li className="relative group">
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
        </li>
        <li className="relative group">
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </li>
        {session ? (
          <li></li>
        ) : (
          <li className="bg-blue-600 bg-opacity-30 p-2 rounded-lg transition-colors duration-200 hover:bg-blue-600 hover:bg-opacity-50">
            <Link
              href="/login"
              className="text-blue-400 hover:bg-opacity-40 px-2 py-2 rounded transition-colors duration-200"
            >
              Login
            </Link>
          </li>
        )}
        <Popover>
          <PopoverTrigger>
            <span>
              <Header />
            </span>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverProfile />
          </PopoverContent>
        </Popover>
      </ul>

      {/* Menu de navegação para dispositivos móveis */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-70 backdrop-blur-md transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
        onClick={closeMenu}
      >
        <ul
          className="list-none flex flex-col space-y-4 p-14 text-center mt-32"
          onClick={(e) => e.stopPropagation()}
        >
          <li className="w-full">
            <Link
              href="/"
              className="block text-white hover:text-gray-300 p-4 bg-slate-500 bg-opacity-25 rounded-lg"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

          <li className="w-full">
            <Link
              href="/about"
              className="block text-white hover:text-gray-300 p-4 bg-slate-500 bg-opacity-25 rounded-lg"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>

          <li className="w-full">
            <Link
              href="/contact"
              className="block text-white hover:text-gray-300 p-4 bg-slate-500 bg-opacity-25 rounded-lg"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>

          {session ? (
            <li></li>
          ) : (
            <li className="bg-blue-600 bg-opacity-30 p-2 rounded-lg transition-colors duration-200 hover:bg-blue-600 hover:bg-opacity-50">
              <Link
                href="/login"
                className="text-blue-400 hover:bg-opacity-40 px-2 py-2 rounded transition-colors duration-200"
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>
          )}

          <Popover>
            <PopoverTrigger>
              <span>
                <Header />
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverProfile />
            </PopoverContent>
          </Popover>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
