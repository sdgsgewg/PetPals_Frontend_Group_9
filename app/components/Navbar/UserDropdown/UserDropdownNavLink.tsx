import React from "react";
import { FileText, User, LogOut } from "lucide-react";
import { useUsers } from "@/app/context/users/UsersContext";
import UserDropdownNavItem from "./UserDropdownNavItem";

interface UserDropdownNavLinkProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const UserDropdownNavLink: React.FC<UserDropdownNavLinkProps> = ({
  setIsOpen,
  onClose,
}) => {
  const { logoutUser } = useUsers();

  const handleMenuClick = (menu: string) => {
    if (menu === "Log out") {
      logoutUser();
    }
    onClose();
    setIsOpen(false);
  };

  return (
    <>
      <UserDropdownNavItem
        href="/transactions"
        icon={<FileText size={16} />}
        label="View Transactions"
        onMenuClick={handleMenuClick}
      />
      <UserDropdownNavItem
        href="/profile"
        icon={<User size={16} />}
        label="Profile"
        onMenuClick={handleMenuClick}
      />
      <UserDropdownNavItem
        href="/"
        icon={<LogOut size={16} />}
        label="Log out"
        onMenuClick={handleMenuClick}
      />
    </>
  );
};

export default UserDropdownNavLink;
