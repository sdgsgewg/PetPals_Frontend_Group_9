import React from "react";
import NavLink from "./NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginBox from "../Authentication/Login/LoginBox";
import RegisterBox from "../Authentication/Register/RegisterBox";
import { useUsers } from "@/app/context/users/UsersContext";
import LogoutBox from "../Authentication/LogoutBox";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, setIsOpen }) => {
  const { isLoggedIn } = useUsers();

  return (
    <div>
      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isOpen && (
        <>
          <div className="md:hidden mt-3 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 rounded-md shadow-md dark:shadow-gray-700 p-4 space-y-4 transition-all duration-300">
            <NavLink setIsOpen={setIsOpen} />
          </div>
          <div className="md:hidden mt-4 flex items-center gap-6">
            <ThemeSwitcher />
            {isLoggedIn ? (
              <LogoutBox setIsOpen={setIsOpen} />
            ) : (
              <>
                <LoginBox setIsOpen={setIsOpen} />
                <RegisterBox setIsOpen={setIsOpen} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
