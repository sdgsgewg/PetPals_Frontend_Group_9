"use client";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useEffect } from "react";
import InputField from "../../FormField/InputField";
import SelectField from "../../FormField/SelectField";

const RegisterInputField = () => {
  const {
    userRegister,
    setUserRegister,
    roles,
    fetchRoles,
    registerErrorMessages,
  } = useUsers();

  useEffect(() => {
    fetchRoles();
  }, []);

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
      <InputField
        label="Name"
        name="name"
        placeholder="Full Name"
        value={userRegister.name}
        onChange={handleInputChange}
        error={registerErrorMessages.Name}
      />

      {/* Email */}
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        value={userRegister.email}
        onChange={handleInputChange}
        error={registerErrorMessages.Email}
      />

      {/* Password */}
      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        value={userRegister.password}
        onChange={handleInputChange}
        error={registerErrorMessages.Password}
      />

      {/* Phone */}
      <InputField
        label="Phone"
        name="phone"
        type="tel"
        placeholder="Phone Number"
        value={userRegister.phone}
        onChange={handleInputChange}
        error={registerErrorMessages.Phone}
      />

      {/* Address */}
      <InputField
        label="Address"
        name="address"
        placeholder="Address"
        value={userRegister.address}
        onChange={handleInputChange}
        error={registerErrorMessages.Address}
      />

      {/* City */}
      <InputField
        label="City"
        name="city"
        placeholder="City"
        value={userRegister.city}
        onChange={handleInputChange}
        error={registerErrorMessages.City}
      />

      {/* Role */}
      <SelectField
        label="Role"
        name="roleId"
        value={userRegister.roleId}
        onChange={handleInputChange}
        options={roles}
        error={registerErrorMessages.RoleId}
      />
    </>
  );
};

export default RegisterInputField;
