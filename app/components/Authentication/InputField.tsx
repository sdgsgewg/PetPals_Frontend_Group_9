"use client";
import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  optional?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  optional = false,
}) => {
  return (
    <div>
      <label className="text-gray-600 dark:text-gray-300 font-semibold">
        {label} {optional && <span className="italic">(optional)</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg mt-2 ${
          error ? "border-red-500 mb-2" : "mb-4"
        }`}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
};

export default InputField;
