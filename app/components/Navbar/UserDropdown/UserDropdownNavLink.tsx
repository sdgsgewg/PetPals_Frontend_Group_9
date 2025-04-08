import React from "react";
import { PawPrint, PlusCircle, FileText, User, LogOut } from "lucide-react";
import { useUsers } from "@/app/context/users/UsersContext";
import UserDropdownNavItem from "./UserDropdownNavItem";
import { useNavbar } from "@/app/context/navbar/NavbarContext";

const UserDropdownNavLink = () => {
  const { handleCloseDropdownMenu, handleCloseUserDropdownMenu } = useNavbar();
  const { loggedInUser, logoutUser } = useUsers();

  const handleMenuClick = (menu: string) => {
    if (menu === "Log out") {
      logoutUser();
    }
    handleCloseDropdownMenu();
    handleCloseUserDropdownMenu();
  };

  return (
    <>
      {/* My Pets or My Services */}
      {loggedInUser.role.name.toLowerCase() === "owner" && (
        <UserDropdownNavItem
          href="/my-pets"
          icon={<PawPrint size={16} />}
          label="My Pets"
          onMenuClick={handleMenuClick}
        />
      )}
      {loggedInUser.role.name.toLowerCase() === "provider" && (
        <UserDropdownNavItem
          href="/my-services"
          icon={<PlusCircle size={16} />}
          label="My Services"
          onMenuClick={handleMenuClick}
        />
      )}

      {/* Transaction History or Requests */}
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

      {/* Profile */}
      <UserDropdownNavItem
        href="/profile"
        icon={<User size={16} />}
        label="Profile"
        onMenuClick={handleMenuClick}
      />

      {/* Log Out */}
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
