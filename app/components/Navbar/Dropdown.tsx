import React from "react";
import NavLink from "./NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginBox from "../Authentication/Login/LoginBox";
import RegisterBox from "../Authentication/Register/RegisterBox";
import { useUsers } from "@/app/context/users/UsersContext";
import WelcomeMessage from "./WelcomeMessage";
import UserDropdown from "./UserDropdown/UserDropdown";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUserDropdownOpen: boolean;
  toggleUserDropdown: () => void;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  setIsOpen,
  isUserDropdownOpen,
  toggleUserDropdown,
  onClose,
}) => {
  const { isLoggedIn } = useUsers();

  return (
    <div>
      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isOpen && (
        <>
          <div className="lg:hidden mt-3 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 rounded-md shadow-md dark:shadow-gray-700 p-4 space-y-4 transition-all duration-300">
            <NavLink setIsOpen={setIsOpen} />
            {isLoggedIn && (
              <>
                <WelcomeMessage
                  isUserDropdownOpen={isUserDropdownOpen}
                  toggleUserDropdown={toggleUserDropdown}
                />
                <UserDropdown
                  setIsOpen={setIsOpen}
                  isUserDropdownOpen={isUserDropdownOpen}
                  onClose={onClose}
                />
              </>
            )}
          </div>
          <div className="lg:hidden mt-4 flex items-center gap-6">
            <ThemeSwitcher />
            {!isLoggedIn && (
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
