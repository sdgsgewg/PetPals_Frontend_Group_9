import Link from "next/link";
import React from "react";

interface LoginBoxProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginBox: React.FC<LoginBoxProps> = ({ setIsOpen }) => {
  return (
    <Link href="/login">
      <button
        className="
      bg-blue-100 dark:bg-gray-400 
      text-sm font-semibold text-blue-600 dark:text-gray-700 
      px-3 py-1 rounded-lg transition-colors duration-300
      hover:bg-blue-200 dark:hover:bg-gray-500
      hover:text-blue-900 dark:hover:text-white cursor-pointer
    "
        onClick={() => setIsOpen(false)}
      >
        Log in
      </button>
    </Link>
  );
};

export default LoginBox;
