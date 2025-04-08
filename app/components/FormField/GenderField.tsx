import React from "react";

interface GenderFieldProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  isDisabled?: boolean;
}

const GenderField: React.FC<GenderFieldProps> = ({
  value,
  onChange,
  error,
  isDisabled,
}) => {
  return (
    <div>
      <label className="text-gray-600 dark:text-gray-300 font-semibold">
        Gender
      </label>
      <select
        disabled={isDisabled}
        className={`w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
          error ? "border-red-500" : ""
        }`}
        name="gender"
        value={value}
        onChange={onChange}
      >
        <option value="">Select a gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
};

export default GenderField;
