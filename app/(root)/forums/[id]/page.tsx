"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";

const ForumDetail = () => {
  const { id } = useParams();

  // Dummy data postingan
  const post = {
    id,
    title: "Bagaimana cara merawat anak kucing?",
    user: "John Doe",
    date: "17 Mar 2025",
    content:
      "Saya baru saja mengadopsi anak kucing, tapi saya masih bingung bagaimana cara merawatnya dengan baik. Ada saran?",
  };

  // Dummy data komentar
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Jane Smith",
      text: "Pastikan kamu memberi makanan yang sesuai usianya!",
      date: "17 Mar 2025",
    },
    {
      id: 2,
      user: "Mike Johnson",
      text: "Jangan lupa ajak main agar tidak stres.",
      date: "18 Mar 2025",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  // Menambah komentar baru
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const formattedDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "Anda",
          text: newComment,
          date: formattedDate,
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <NormalContent>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-lg">
        {/* Judul & Info */}
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Oleh <span className="font-semibold">{post.user}</span> • {post.date}
        </p>

        {/* Isi Postingan */}
        <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
        </div>

        {/* Komentar */}
        <h2 className="text-xl font-semibold mt-6 mb-4">
          Komentar ({comments.length})
        </h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700"
            >
              <p className="font-semibold">{comment.user}</p>
              <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {comment.date}
              </p>
            </div>
          ))}
        </div>

        {/* Form Tambah Komentar */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Tambahkan Komentar</h3>
          <textarea
            className="w-full p-3 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
            rows={3}
            placeholder="Tulis komentar..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500"
            onClick={handleAddComment}
          >
            Kirim
          </button>
        </div>
      </div>
    </NormalContent>
  );
};

export default ForumDetail;
