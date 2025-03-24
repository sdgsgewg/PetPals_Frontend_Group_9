import { useUsers } from "@/app/context/users/UsersContext";
import React from "react";

interface LogoutBoxProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutBox: React.FC<LogoutBoxProps> = ({ setIsOpen }) => {
  const { loggedInUser, logoutUser } = useUsers();

  const handleLogout = () => {
    logoutUser();
    console.log("Logged In User: " + loggedInUser);
    setIsOpen(false);
  };

  return (
    <button
      className="
  bg-blue-100 dark:bg-gray-400 
  text-sm font-semibold text-blue-600 dark:text-gray-700 
  px-3 py-1 rounded-lg transition-colors duration-300
  hover:bg-blue-200 dark:hover:bg-gray-500
  hover:text-blue-900 dark:hover:text-white cursor-pointer
"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
};

export default LogoutBox;
