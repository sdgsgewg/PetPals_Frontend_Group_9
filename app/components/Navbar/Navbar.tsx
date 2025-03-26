"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Hamburger from "./Hamburger";
import Dropdown from "./Dropdown";
import NavLink from "./NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginBox from "../Authentication/Login/LoginBox";
import RegisterBox from "../Authentication/Register/RegisterBox";
import { useUsers } from "@/app/context/users/UsersContext";
import UserDropdown from "./UserDropdown/UserDropdown";
import WelcomeMessage from "./WelcomeMessage";

const Navbar = () => {
  const { isLoggedIn } = useUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () =>
    setIsUserDropdownOpen(isUserDropdownOpen === true ? false : true);

  const handleCloseUserDropdown = () => setIsUserDropdownOpen(false);

  return (
    <>
      <div className="fixed top-0 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 bg-white dark:bg-gray-800 shadow-md z-10 transition-colors duration-300">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/img/logo.png" alt="logo" width={120} height={120} />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-6 text-slate-600 dark:text-gray-300 text-md">
            <NavLink setIsOpen={setIsOpen} />
            <ThemeSwitcher />
            {isLoggedIn ? (
              <>
                <WelcomeMessage
                  isUserDropdownOpen={isUserDropdownOpen}
                  toggleUserDropdown={toggleUserDropdown}
                />
              </>
            ) : (
              <>
                <LoginBox setIsOpen={setIsOpen} />
                <RegisterBox setIsOpen={setIsOpen} />
              </>
            )}
          </div>

          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>

        <Dropdown
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isUserDropdownOpen={isUserDropdownOpen}
          toggleUserDropdown={toggleUserDropdown}
          onClose={handleCloseUserDropdown}
        />
      </div>
      <UserDropdown
        setIsOpen={setIsOpen}
        isUserDropdownOpen={isUserDropdownOpen}
        onClose={handleCloseUserDropdown}
      />
    </>
  );
};

export default Navbar;
