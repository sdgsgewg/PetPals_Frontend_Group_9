"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Menggunakan icon dari lucide-react

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  step?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  step,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label className="text-gray-600 dark:text-gray-300 font-semibold">
        {label}
      </label>
      {label === "Age" && (
        <p className="text-slate-500 dark:text-slate-400 text-sm italic my-1">
          Please input 0.X if your pet age is below 1 (Ex: 0.5 equals 5 months).
        </p>
      )}
      <div className="relative w-full">
        <input
          type={type === "password" && showPassword ? "text" : type}
          step={type === "number" ? step ?? "any" : undefined}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg mt-2 pr-10 ${
            error ? "border-red-500 mb-2" : "mb-4"
          }`}
          name={name}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-7.5 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
};

export default InputField;
