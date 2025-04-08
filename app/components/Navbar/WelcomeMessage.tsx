import { useNavbar } from "@/app/context/navbar/NavbarContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const WelcomeMessage = () => {
  const { isUserDropdownMenuOpen, toggleUserDropdownMenu } = useNavbar();
  const { isLoggedIn, loggedInUser } = useUsers();

  let splittedName = [];
  let firstName = "";

  if (isLoggedIn) {
    splittedName = loggedInUser?.name?.split(" ");
    firstName = splittedName[0];
  }

  return (
    <div className="flex items-center gap-1">
      <p
        className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition duration-300 ease-in-out cursor-pointer"
        onClick={toggleUserDropdownMenu}
      >
        {`Welcome, ${firstName}`}
      </p>
      <span>
        {isUserDropdownMenuOpen ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </span>
    </div>
  );
};

export default WelcomeMessage;
