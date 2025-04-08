import { useNavbar } from "@/app/context/navbar/NavbarContext";
import Link from "next/link";
import React from "react";

const RegisterBox = () => {
  const { handleCloseDropdownMenu } = useNavbar();

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
        onClick={handleCloseDropdownMenu}
      >
        Sign up
      </button>
    </Link>
  );
};

export default RegisterBox;
