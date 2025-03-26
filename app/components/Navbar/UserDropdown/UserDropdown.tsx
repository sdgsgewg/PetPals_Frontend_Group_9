import React from "react";
import UserDropdownNavLink from "./UserDropdownNavLink";

interface UserDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUserDropdownOpen: boolean;
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  setIsOpen,
  isUserDropdownOpen,
  onClose,
}) => {
  return (
    <div>
      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isUserDropdownOpen && (
        <>
          <div className="xl:absolute xl:top-0 xl:right-0 mt-0 xl:mt-16 xl:me-12 z-50 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 rounded-md shadow-md dark:shadow-gray-700 p-4 space-y-4 transition-all duration-300">
            <UserDropdownNavLink setIsOpen={setIsOpen} onClose={onClose} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
