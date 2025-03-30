import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="border-b-2 border-slate-200 pb-2 mb-4">
        <h1 className="text-4xl font-bold">My Pets</h1>
      </div>
      <div className="mb-4">
        <Link href={`/adoptions/new`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md shadow-md px-3 py-2 transition duration-300 ease-in-out cursor-pointer">
            Add New Pet
          </button>
        </Link>
      </div>
    </>
  );
};

export default Header;
