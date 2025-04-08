import { useUsers } from "@/app/context/users/UsersContext";
import React from "react";
import InputField from "../../FormField/InputField";

const LoginInputField = () => {
  const { userLogin, setUserLogin, loginErrorMessages } = useUsers();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserLogin(name, value);
  };

  return (
    <>
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        value={userLogin.email}
        onChange={handleInputChange}
        error={loginErrorMessages.Email}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        value={userLogin.password}
        onChange={handleInputChange}
        error={loginErrorMessages.Password}
      />
    </>
  );
};

export default LoginInputField;
