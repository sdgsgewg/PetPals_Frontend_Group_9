import React from "react";
import NavLink from "./NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginBox from "../Authentication/Login/LoginBox";
import RegisterBox from "../Authentication/Register/RegisterBox";
import { useUsers } from "@/app/context/users/UsersContext";
import WelcomeMessage from "./WelcomeMessage";
import UserDropdown from "./UserDropdown/UserDropdown";
import { useNavbar } from "@/app/context/navbar/NavbarContext";

const Dropdown = () => {
  const { isDropdownMenuOpen } = useNavbar();
  const { isLoggedIn } = useUsers();

  return (
    <div>
      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isDropdownMenuOpen && (
        <>
          <div className="lg:hidden mt-3 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 rounded-md shadow-md dark:shadow-gray-700 p-4 space-y-4 transition-all duration-300">
            <NavLink />
            {isLoggedIn && (
              <>
                <WelcomeMessage />
                <UserDropdown />
              </>
            )}
          </div>
          <div className="lg:hidden mt-4 flex items-center gap-6">
            <ThemeSwitcher />
            {!isLoggedIn && (
              <>
                <LoginBox />
                <RegisterBox />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
