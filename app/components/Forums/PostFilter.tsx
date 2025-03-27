"use client";
import { useForums } from "@/app/context/forums/ForumsContext";
import Loading from "@/app/loading";
import React, { useEffect } from "react";

const PostFilter = () => {
  const { forumCategories, fetchForumCategories, setForumCategoryId, loading } =
    useForums();

  useEffect(() => {
    fetchForumCategories();
  }, []);

  function getCategoryName(categoryName: string) {
    if (!categoryName) return "Unknown";
    return (
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              key={category.forumCategoryId}
              className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
              value={category.forumCategoryId}
              onClick={() => setForumCategoryId(category.forumCategoryId)}
            >
              {getCategoryName(category.name)}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default PostFilter;
