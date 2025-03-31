import Link from "next/link";
import React from "react";

interface HeaderProps {
  title: string;
  redirectUrl: string;
  addText: string;
}

const Header: React.FC<HeaderProps> = ({ title, redirectUrl, addText }) => {
  return (
    <>
      <div className="border-b-2 border-slate-200 pb-2 mb-4">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      <div className="mb-4">
        <Link href={redirectUrl}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md shadow-md px-3 py-2 transition duration-300 ease-in-out cursor-pointer">
            {addText}
          </button>
        </Link>
      </div>
    </>
  );
};

export default Header;
