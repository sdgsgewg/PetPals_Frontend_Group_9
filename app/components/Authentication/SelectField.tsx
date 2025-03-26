"use client";
import React from "react";

interface Role {
  roleId: number;
  name: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Role[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <div>
      <label className="text-gray-600 dark:text-gray-300 font-semibold">
        {label}
      </label>
      <select
        className={`w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
          error ? "border-red-500" : ""
        }`}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="0">Select a role</option>
        {options.map((role) => (
          <option key={role.roleId} value={role.roleId}>
            {role.name}
          </option>
        ))}
      </select>
      {(error || Number(error) !== 0) && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
