import React from "react";

const BigHeroContent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-gray-100 min-h-[81dvh] flex flex-col pt-16 pb-24">{children}</div>
  );
};

export default BigHeroContent;
