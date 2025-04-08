import React from "react";

const SearchFilterBox = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-white dark:bg-slate-800 flex flex-col md:flex-row rounded-md shadow-sm text-black px-4 lg:px-6 py-4 lg:py-6">
      {children}
    </div>
  );
};

export default SearchFilterBox;
