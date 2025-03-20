import React from "react";

const SearchFilterBox = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-white flex justify-between rounded-sm shadow-sm text-black px-4 py-8">
      {children}
    </div>
  );
};

export default SearchFilterBox;
