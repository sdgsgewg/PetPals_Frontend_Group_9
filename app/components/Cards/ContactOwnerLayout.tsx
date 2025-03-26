import React from "react";

const ContactOwnerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
      {children}
    </div>
  );
};

export default ContactOwnerLayout;
