import Link from "next/link";
import React from "react";

interface UserDropdownNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onMenuClick: (menu: string) => void;
}

const UserDropdownNavItem: React.FC<UserDropdownNavItemProps> = ({
  href,
  icon,
  label,
  onMenuClick,
}) => {
  return (
    <Link
      href={href}
      className={`${
        label === "Log out" ? "border-t-2 pt-4" : ""
      } flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition duration-300 ease-in-out`}
      onClick={() => onMenuClick(label)}
    >
      {icon}
      {label}
    </Link>
  );
};

export default UserDropdownNavItem;
