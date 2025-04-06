"use client";
import React from "react";

interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  rows = 4, // default to 4 rows
}) => {
  return (
    <div className="relative">
      <label className="text-gray-600 dark:text-gray-300 font-semibold">
        {label}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg mt-2 ${
          error ? "border-red-500 mb-2" : "mb-4"
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-y`}
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
};

export default TextareaField;
