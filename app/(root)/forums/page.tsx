"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import Link from "next/link";
import React, { useState } from "react";

const Forums = () => {
  const [categories, setCategories] = useState([
    "Adopsi",
    "Perawatan",
    "Training",
    "Umum",
  ]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Bagaimana cara merawat anak kucing?",
      user: "John Doe",
      date: "17 Mar 2025",
      comments: 12,
    },
    {
      id: 2,
      title: "Anjing saya sulit dilatih, ada saran?",
      user: "Jane Smith",
      date: "16 Mar 2025",
      comments: 8,
    },
    {
      id: 3,
      title: "Tempat penitipan hewan yang bagus?",
      user: "Mike Johnson",
      date: "15 Mar 2025",
      comments: 5,
    },
  ]);

  return (
    <NormalContent>
      <div className="w-full max-w-2xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Forum PetPals</h1>
          <Link href="/forums/new">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer">
              Buat Postingan
            </button>
          </Link>
        </div>

        {/* Filter Kategori */}
        <div className="flex space-x-3 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {category}
            </button>
          ))}
        </div>

        {/* List Postingan */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/forums/${post.id}`}
              className="block border-b p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Oleh {post.user} • {post.date} • 💬 {post.comments} komentar
              </p>
            </Link>
          ))}
        </div>
      </div>
    </NormalContent>
  );
};

export default Forums;
