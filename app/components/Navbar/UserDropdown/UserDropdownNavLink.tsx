import React from "react";
import { PawPrint, PlusCircle, FileText, User, LogOut } from "lucide-react";
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
  const { loggedInUser, logoutUser } = useUsers();

  const handleMenuClick = (menu: string) => {
    if (menu === "Log out") {
      logoutUser();
    }
    onClose();
    setIsOpen(false);
  };

  return (
    <>
      {loggedInUser.role.name.toLowerCase() === "owner" && (
        <UserDropdownNavItem
          href="/adoptions/new"
          icon={<PawPrint size={16} />}
          label="Add New Pet"
          onMenuClick={handleMenuClick}
        />
      )}
      {loggedInUser.role.name.toLowerCase() === "provider" && (
        <UserDropdownNavItem
          href="/services/new"
          icon={<PlusCircle size={16} />}
          label="Add New Service"
          onMenuClick={handleMenuClick}
        />
      )}
      {loggedInUser.role.name.toLowerCase() === "adopter" ? (
        <UserDropdownNavItem
          href="/transactions"
          icon={<FileText size={16} />}
          label="View Transactions"
          onMenuClick={handleMenuClick}
        />
      ) : loggedInUser.role.name.toLowerCase() === "owner" ? (
        <UserDropdownNavItem
          href="/adoption-transaction-request"
          icon={<FileText size={16} />}
          label="View Transaction Request"
          onMenuClick={handleMenuClick}
        />
      ) : (
        <UserDropdownNavItem
          href="/service-transaction-request"
          icon={<FileText size={16} />}
          label="View Transaction Request"
          onMenuClick={handleMenuClick}
        />
      )}
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
