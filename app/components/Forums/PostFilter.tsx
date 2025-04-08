"use client";
import { useForums } from "@/app/context/forums/ForumsContext";
import { useGlobal } from "@/app/context/GlobalContext";
import React from "react";

const PostFilter = () => {
  const { getForumCategoryName } = useGlobal();
  const { forumCategories, setForumCategoryId } = useForums();

  return (
    <div className="flex space-x-3 mb-6">
      <button
        className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
        value="0"
        onClick={() => setForumCategoryId(0)}
      >
        All
      </button>
      {forumCategories.map((category) => (
        <button
          key={category.id}
          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          value={category.id}
          onClick={() => setForumCategoryId(category.id)}
        >
          {getForumCategoryName(category.name)}
        </button>
      ))}
    </div>
  );
};

export default PostFilter;
