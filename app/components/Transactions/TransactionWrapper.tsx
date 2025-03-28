import React from "react";

const TransactionWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="w-full max-w-4xl mx-auto">{children}</div>;
};

export default TransactionWrapper;
