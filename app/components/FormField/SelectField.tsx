import { useGlobal } from "@/app/context/GlobalContext";

interface SelectFieldProps {
  label: string;
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: number; name: string }[]; // general type
  error?: string;
  isDisabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  isDisabled,
}) => {
  const { getForumCategoryName } = useGlobal();

  return (
    <div>
      <label className="text-gray-600 dark:text-gray-300 font-semibold">
        {label}
      </label>
      <select
        disabled={isDisabled}
        className={`w-full outline-none border p-2 mt-2 mb-4 rounded-lg
          ${
            isDisabled
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed"
              : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-400 dark:border-gray-600"
          }
          ${error ? "border-red-500" : ""}
        `}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option
          value={name === "species" || name === "categoryName" ? "" : "0"}
        >
          {name === "species" ? "All" : `Select a ${label}`}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={
              name === "species" || name === "categoryName"
                ? option.name
                : option.id
            }
          >
            {getForumCategoryName(option.name)}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
};

export default SelectField;
