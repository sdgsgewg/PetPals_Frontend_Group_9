"use client";
import React, { useEffect, useState } from "react";

interface AgeFieldProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const AgeField: React.FC<AgeFieldProps> = ({
  label = "Age",
  value,
  onChange,
  error,
}) => {
  const [years, setYears] = useState<string>("0");
  const [months, setMonths] = useState<string>("0");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!value) return;
    const parsedYears = Math.floor(value);
    const parsedMonths = Math.round((value - parsedYears) * 12);

    if (
      parsedYears.toString() !== years ||
      parsedMonths.toString() !== months
    ) {
      setYears(parsedYears.toString());
      setMonths(parsedMonths.toString());
    }

    setIsInitialized(true);
  }, [value]);

  // Update parent when user types
  useEffect(() => {
    if (!years || !months) return;
    if (isInitialized) {
      const ageDecimal = (parseInt(years) || 0) + (parseInt(months) || 0) / 12;
      onChange(parseFloat(ageDecimal.toFixed(2)));
    }
  }, [years, months]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value || "0", 10);
    if (isNaN(val)) val = 0;
    val = Math.min(Math.max(val, 0), 11);
    setMonths(val.toString());
  };

  return (
    <div className="mb-4">
      <label className="text-gray-600 dark:text-gray-300 font-semibold">
        {label}
      </label>
      <p className="text-slate-500 dark:text-slate-400 text-sm italic my-1">
        {`Input the pet's age in years and months.`}
      </p>
      <div className="flex gap-8">
        <div className="w-1/2 flex flex-col gap-2">
          <label className="text-gray-600 dark:text-gray-300 font-semibold">
            Year
          </label>
          <input
            type="number"
            min={0}
            placeholder="Years"
            className="w-full px-4 py-2 border rounded-lg"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <label className="text-gray-600 dark:text-gray-300 font-semibold">
            Month
          </label>
          <input
            type="number"
            min={0}
            max={11}
            placeholder="Months"
            className="w-full px-4 py-2 border rounded-lg"
            value={months}
            onChange={handleMonthChange}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AgeField;
