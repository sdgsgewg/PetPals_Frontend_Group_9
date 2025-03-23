import React from "react";

const CardDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-lg md:max-w-4xl mx-auto p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
};

export default CardDetailLayout;
