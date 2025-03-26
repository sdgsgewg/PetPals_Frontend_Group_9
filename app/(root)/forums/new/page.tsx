"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";

const NewForumPost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const categories = ["Adopsi", "Perawatan", "Training", "Umum"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !category || !content.trim()) {
      alert("Semua kolom harus diisi!");
      return;
    }

    console.log({ title, category, content });

    router.push("/forums");
  };

  return (
    <NormalContent>
      <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Buat Postingan Baru</h1>
        <form onSubmit={handleSubmit}>
          {/* Judul */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Judul</label>
            <input
              type="text"
              className="w-full p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
              placeholder="Masukkan judul..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Kategori */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Kategori</label>
            <select
              className="w-full p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Pilih kategori</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Konten */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Konten</label>
            <textarea
              className="w-full p-2 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
              rows={6}
              placeholder="Tulis isi postingan..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            Posting
          </button>
        </form>
      </div>
    </NormalContent>
  );
};

export default NewForumPost;
