import Link from "next/link";
import React from "react";

interface RegisterBoxProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterBox: React.FC<RegisterBoxProps> = ({ setIsOpen }) => {
  return (
    <Link href="/register">
      <button
        className="
      bg-blue-600 dark:bg-gray-600 
      text-sm font-semibold text-white dark:text-gray-100 
      px-3 py-1 rounded-lg transition-colors duration-300
      hover:bg-blue-500 dark:hover:bg-gray-500
      hover:text-gray-100 dark:hover:text-white cursor-pointer
    "
        onClick={() => setIsOpen(false)}
      >
        Sign up
      </button>
    </Link>
  );
};

export default RegisterBox;
