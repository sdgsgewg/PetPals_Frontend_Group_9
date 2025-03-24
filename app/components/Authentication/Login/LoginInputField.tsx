import { useUsers } from "@/app/context/users/UsersContext";
import React from "react";

const LoginInputField = () => {
  const { userLogin, setUserLogin } = useUsers();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserLogin(name, value);
  };

  return (
    <>
      {/* Email */}
      <label
        className="text-gray-600 dark:text-gray-300 font-semibold"
        htmlFor="email"
      >
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-4 border rounded-lg"
        name="email"
        value={userLogin.email}
        onChange={handleInputChange}
      />

      {/* Password */}
      <label
        className="text-gray-600 dark:text-gray-300 font-semibold"
        htmlFor="password"
      >
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-4 border rounded-lg"
        name="password"
        value={userLogin.password}
        onChange={handleInputChange}
      />
    </>
  );
};

export default LoginInputField;
