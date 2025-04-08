import React from "react";
import { Menu, X } from "lucide-react";
import { useNavbar } from "@/app/context/navbar/NavbarContext";

const Hamburger = () => {
  const { isDropdownMenuOpen, toggleDropdownMenu } = useNavbar();

  return (
    <>
      {/* Burger Menu Button (MD ke bawah) */}
      <button
        onClick={toggleDropdownMenu}
        className="lg:hidden text-black dark:text-white focus:outline-none cursor-pointer"
      >
        {isDropdownMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </>
  );
};

export default Hamburger;
