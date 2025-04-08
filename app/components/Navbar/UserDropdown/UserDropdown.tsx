import React from "react";
import UserDropdownNavLink from "./UserDropdownNavLink";
import { useNavbar } from "@/app/context/navbar/NavbarContext";

const UserDropdown = () => {
  const { isUserDropdownMenuOpen } = useNavbar();

  return (
    <div>
      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isUserDropdownMenuOpen && (
        <>
          <div className="xl:absolute xl:top-0 xl:right-0 mt-0 xl:mt-16 xl:me-12 z-50 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 rounded-md shadow-md dark:shadow-gray-700 p-4 space-y-4 transition-all duration-300">
            <UserDropdownNavLink />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
