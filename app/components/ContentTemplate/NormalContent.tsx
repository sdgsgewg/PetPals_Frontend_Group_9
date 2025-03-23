import React from "react";

const NormalContent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[81dvh] flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pt-32 pb-24 transition-colors duration-300">
      {children}
    </div>
  );
};

export default NormalContent;
