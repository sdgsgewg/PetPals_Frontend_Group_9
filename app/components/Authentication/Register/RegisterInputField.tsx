"use client";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useEffect } from "react";

const RegisterInputField = () => {
  const { userRegister, setUserRegister, roles, fetchRoles } = useUsers();

  useEffect(() => {
    fetchRoles();
  }, []);

  // Meng-update state ketika input berubah
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const newValue: string | number = name === "roleId" ? Number(value) : value;

    setUserRegister(name, newValue);
  };

  return (
    <>
      {/* Name */}
      <label
        className="text-gray-600 dark:text-gray-300 font-semibold"
        htmlFor="name"
      >
        Name
      </label>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-2 mb-4 border rounded-lg"
        name="name"
        value={userRegister.name}
        onChange={handleInputChange}
      />

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
        value={userRegister.email}
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
        value={userRegister.password}
        onChange={handleInputChange}
      />

      {/* Phone */}
      <label
        className="text-gray-600 dark:text-gray-300 font-semibold"
        htmlFor="phone"
      >
        Phone
      </label>
      <input
        type="phone"
        placeholder="Phone Number"
        className="w-full px-4 py-2 mb-4 border rounded-lg"
        name="phone"
        value={userRegister.phone}
        onChange={handleInputChange}
      />

      {/* Address */}
      <label
        className="text-gray-600 dark:text-gray-300 font-semibold"
        htmlFor="address"
      >
        Address
      </label>
      <input
        type="address"
        placeholder="Address"
        className="w-full px-4 py-2 mb-4 border rounded-lg"
        name="address"
        value={userRegister.address}
        onChange={handleInputChange}
      />

      {/* Role */}
      <label
        className="text-gray-600 dark:text-gray-300 font-semibold"
        htmlFor="roleId"
      >
        Role
      </label>
      <select
        className="w-full outline-none border border-gray-400 dark:border-gray-600 p-2 mt-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        name="roleId"
        value={userRegister.roleId}
        onChange={handleInputChange}
      >
        <option value="0">Select a role</option>
        {roles.map((role) => (
          <option key={role.roleId} value={role.roleId}>
            {role.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default RegisterInputField;
