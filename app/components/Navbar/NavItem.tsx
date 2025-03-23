import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, setIsOpen }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition duration-300 ease-in-out"
      onClick={() => setIsOpen(false)}
    >
      {icon}
      {label}
    </Link>
  );
};

export default NavItem;
