import { useUsers } from "@/app/context/users/UsersContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

interface WelcomeMessageProps {
  isUserDropdownOpen: boolean;
  toggleUserDropdown: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  isUserDropdownOpen,
  toggleUserDropdown,
}) => {
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
        onClick={toggleUserDropdown}
      >
        {`Welcome, ${firstName}`}
      </p>
      <span>
        {isUserDropdownOpen ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </span>
    </div>
  );
};

export default WelcomeMessage;
