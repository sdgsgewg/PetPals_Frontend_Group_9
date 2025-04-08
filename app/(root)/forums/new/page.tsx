"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import { useForums } from "@/app/context/forums/ForumsContext";
import { useEffect } from "react";
import MessageModal from "@/app/components/modals/MessageModal";
import { useUsers } from "@/app/context/users/UsersContext";
import InputField from "@/app/components/FormField/InputField";
import TextareaField from "@/app/components/FormField/TextareaField";
import SelectField from "@/app/components/FormField/SelectField";

const NewForumPost = () => {
  const { loggedInUser } = useUsers();
  const {
    forumCategories,
    newForumPost,
    newForumPostErrorMessage,
    fetchForumCategories,
    setNewPost,
    resetNewPost,
    addForumPost,
  } = useForums();

  useEffect(() => {
    resetNewPost();
    fetchForumCategories();
  }, []);

  useEffect(() => {
    if (loggedInUser?.userId && newForumPost.userId !== loggedInUser.userId) {
      setNewPost("userId", loggedInUser.userId);
    }
  }, [loggedInUser?.userId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newValue: string | number =
      name === "forumCategoryId" ? Number(value) : value;
    setNewPost(name, newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addForumPost();
  };

  return (
    <NormalContent>
      <div className="w-full max-w-xl mx-auto p-6 border bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Buat Postingan Baru</h1>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <InputField
            label="Title"
            name="title"
            placeholder="Title"
            value={newForumPost.title}
            onChange={handleInputChange}
            error={newForumPostErrorMessage.Title}
          />

          {/* Kategori */}
          <SelectField
            label="Forum Category"
            name="forumCategoryId"
            value={newForumPost.forumCategoryId}
            onChange={handleInputChange}
            options={forumCategories}
            error={newForumPostErrorMessage.ForumCategoryId}
          />

          {/* Content */}
          <TextareaField
            label="Content"
            name="content"
            placeholder="Content"
            value={newForumPost.content}
            onChange={handleInputChange}
            error={newForumPostErrorMessage.Content}
          />

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer"
          >
            Post
          </button>
        </form>
      </div>

      <MessageModal title="Add New Post" message="New Post has been made" />
    </NormalContent>
  );
};

export default NewForumPost;
