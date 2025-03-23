import React from "react";
import { Menu, X } from "lucide-react";

interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Burger Menu Button (MD ke bawah) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-black dark:text-white focus:outline-none cursor-pointer"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </>
  );
};

export default Hamburger;
