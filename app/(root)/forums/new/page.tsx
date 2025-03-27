"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import { useForums } from "@/app/context/forums/ForumsContext";
import { useEffect } from "react";
import MessageModal from "@/app/components/modals/MessageModal";
import { useUsers } from "@/app/context/users/UsersContext";

const NewForumPost = () => {
  const { loggedInUser } = useUsers();
  const {
    forumCategories,
    newForumPost,
    fetchForumCategories,
    setNewPost,
    addForumPost,
  } = useForums();

  useEffect(() => {
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
    setNewPost(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addForumPost();
  };

  const getCategoryName = (categoryName: string) => {
    const modifiedCategory =
      categoryName.charAt(0).toUpperCase() +
      categoryName.slice(1).toLowerCase();
    return modifiedCategory;
  };

  return (
    <NormalContent>
      <div className="w-full max-w-xl mx-auto p-6 border bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Buat Postingan Baru</h1>
        <form onSubmit={handleSubmit}>
          {/* Judul */}
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-1">
              Judul
            </label>
            <input
              type="text"
              className="w-full p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
              name="title"
              placeholder="Masukkan judul..."
              value={newForumPost.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Kategori */}
          <div className="mb-4">
            <label
              htmlFor="forumCategoryId"
              className="block font-semibold mb-1"
            >
              Kategori
            </label>
            <select
              className="w-full p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
              name="forumCategoryId"
              value={newForumPost.forumCategoryId}
              onChange={handleInputChange}
            >
              <option value="">Pilih kategori</option>
              {forumCategories.map((cat, index) => (
                <option key={index} value={cat.forumCategoryId}>
                  {getCategoryName(cat.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Konten */}
          <div className="mb-4">
            <label htmlFor="content" className="block font-semibold mb-1">
              Konten
            </label>
            <textarea
              className="w-full p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
              rows={6}
              name="content"
              placeholder="Tulis isi postingan..."
              value={newForumPost.content}
              onChange={handleInputChange}
            ></textarea>
          </div>

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
