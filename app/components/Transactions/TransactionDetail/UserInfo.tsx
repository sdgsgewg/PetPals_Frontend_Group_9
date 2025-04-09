"use client";
import { useServices } from "@/app/context/services/ServicesContext";
import { IPet } from "@/app/interface/pet/IPet";
import { IService } from "@/app/interface/service/IService";
import { IUser } from "@/app/interface/user/IUser";
import React from "react";

interface UserInfoProps {
  user: IUser;
  item: IPet | IService;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, item }) => {
  const { isIService } = useServices();

  return (
    <div className="w-full rounded-md shadow-md overflow-hidden">
      <div className="bg-slate-200 dark:bg-gray-800 px-4 py-2">
        <p className="font-bold">{`${user?.role?.name} Information`}</p>
      </div>
      <div className="bg-white dark:bg-gray-700 text-sm px-4 py-3">
        <p className="text-black dark:text-white">{user?.name}</p>
        <p className="text-black dark:text-white">
          {user?.role?.name?.toLowerCase() === "provider" && isIService(item)
            ? item?.address
            : `${user?.address}, ${user?.city}`}
        </p>
        <p className="text-black dark:text-white">{user?.phone}</p>
      </div>
    </div>
  );
};

export default UserInfo;
