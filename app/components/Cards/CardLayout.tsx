import React from "react";

const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col items-center border border-gray-300 dark:border-gray-700 rounded-md shadow-md bg-white dark:bg-gray-900 overflow-hidden mb-4 hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
      {children}
    </div>
  );
};

export default CardLayout;
