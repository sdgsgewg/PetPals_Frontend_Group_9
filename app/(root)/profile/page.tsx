"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import DataField from "@/app/components/Profile/DataField";
import { useUsers } from "@/app/context/users/UsersContext";
import React from "react";

const Profile = () => {
  // Simulasi data user (nantinya data ini bisa diambil dari API)
  const { loggedInUser } = useUsers();

  return (
    <NormalContent>
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="bg-blue-900 dark:bg-blue-900 text-white text-2xl font-bold px-5 py-3 uppercase mb-2">
          <p className="text-start">User Profile</p>
        </div>

        {/* Name */}
        <DataField label="Name" value={loggedInUser.name} />
        {/* Email */}
        <DataField label="Email" value={loggedInUser.email} />
        {/* Phone */}
        <DataField label="Phone" value={loggedInUser.phone} />
        {/* Address */}
        <DataField label="Address" value={loggedInUser.address} />
        {/* City */}
        <DataField label="City" value={loggedInUser.city} />
        {/* Role */}
        <DataField label="Role" value={loggedInUser.role.name} />
      </div>
      {/* <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Edit Profil
          </button>
        </div> */}
    </NormalContent>
  );
};

export default Profile;
