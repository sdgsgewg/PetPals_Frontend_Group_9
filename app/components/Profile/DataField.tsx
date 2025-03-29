import React from "react";

interface DataFieldProps {
  label: string;
  value: string | number;
}

const DataField: React.FC<DataFieldProps> = ({ label, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 grid grid-cols-3 items-center border-b-2 border-gray-200 dark:border-gray-900 px-5 py-3">
      <p className="text-large font-bold uppercase text-start">{label}:</p>
      <p className="text-large font-semibold col-span-2 text-start">{value}</p>
    </div>
  );
};

export default DataField;
