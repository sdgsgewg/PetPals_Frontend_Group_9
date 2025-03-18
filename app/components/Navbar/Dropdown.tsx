import React from "react";
import NavLink from "./NavLink";

interface DropdownProps {
  isOpen: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen }) => {
  return (
    <div>
      {/* Dropdown Menu (Hanya muncul saat MD ke bawah) */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-blue-100 text-slate-600 rounded-md shadow-md p-4 space-y-4">
          <NavLink />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
