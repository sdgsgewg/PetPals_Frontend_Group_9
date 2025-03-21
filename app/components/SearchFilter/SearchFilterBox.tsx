import React from "react";

const SearchFilterBox = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-white flex rounded-md shadow-sm text-black px-4 lg:px-6 py-6 lg:py-8">
      {children}
    </div>
  );
};

export default SearchFilterBox;
