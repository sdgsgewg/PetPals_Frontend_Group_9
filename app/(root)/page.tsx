"use client";
import React from "react";
import Slider from "../components/Slider";
import NormalContent from "../components/ContentTemplate/NormalContent";
import { useUsers } from "../context/users/UsersContext";

const Home = () => {
  const { isLoggedIn, loggedInUser } = useUsers();

  console.log(loggedInUser);

  return (
    <NormalContent>
      <div className="text-center">
        {isLoggedIn && (
          <h1 className="text-4xl font-bold text-slate-500 dark:text-gray-300 mb-4">{`Welcome, ${loggedInUser.name}`}</h1>
        )}

        <Slider />
      </div>
    </NormalContent>
  );
};

export default Home;
