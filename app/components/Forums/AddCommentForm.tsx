import { useForums } from "@/app/context/forums/ForumsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AddCommentForm = () => {
  const { isLoggedIn, loggedInUser } = useUsers();
  const { forumPost, newForumComment, setNewComment, addForumComment } =
    useForums();
  const router = useRouter();

  useEffect(() => {
    if (
      forumPost.forumPostId &&
      newForumComment.postId !== forumPost.forumPostId
    ) {
      setNewComment("postId", forumPost.forumPostId);
    }
    if (
      loggedInUser?.userId &&
      newForumComment.userId !== loggedInUser.userId
    ) {
      setNewComment("userId", loggedInUser.userId);
    }
  }, [forumPost.forumPostId, loggedInUser?.userId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewComment(name, value);
  };

  const handleAddComment = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (!newForumComment.comment?.trim()) {
      alert("Komentar tidak boleh kosong");
      console.log("New Comment Data:", newForumComment.postId);
      return;
    }

    addForumComment();
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Tambahkan Komentar</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Post Id */}
        <input
          type="hidden"
          name="postId"
          value={newForumComment.postId || ""}
        />

        {/* User Id */}
        <input
          type="hidden"
          name="userId"
          value={newForumComment.userId || ""}
        />

        <textarea
          className="w-full p-3 border dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
          rows={3}
          name="comment"
          placeholder="Tulis komentar..."
          value={newForumComment.comment}
          onChange={handleInputChange}
        ></textarea>

        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer"
          onClick={handleAddComment}
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
