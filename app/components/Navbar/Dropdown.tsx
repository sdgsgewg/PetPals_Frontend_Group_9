import React from "react";
import NavLink from "./NavLink";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div>
      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-blue-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 rounded-md shadow-md dark:shadow-gray-700 p-4 space-y-4 transition-all duration-300">
          <NavLink setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
