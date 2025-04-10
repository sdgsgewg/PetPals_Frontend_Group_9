import { useForums } from "@/app/context/forums/ForumsContext";
import Loading from "../Loading";
import React, { useEffect } from "react";
import ItemNotFound from "../ItemNotFound";

const PostComments = () => {
  const { forumPost, forumComments, fetchForumPostComments, loading } =
    useForums();

  useEffect(() => {
    if (forumPost) {
      fetchForumPostComments(forumPost.forumPostId);
    }
  }, [forumPost]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) return <Loading />;

  return (
    <>
      {forumComments.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-4">
            Komentar ({forumComments.length})
          </h2>
          <div className="space-y-4">
            {forumComments.map((comment) => (
              <div
                key={comment.forumCommentId}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700"
              >
                <p className="font-semibold">{comment.user.name}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.comment}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="my-12">
          <ItemNotFound
            image_url="/img/comment-not-found.png"
            size={100}
            message="Comment Not Found"
          />
        </div>
      )}
    </>
  );
};

export default PostComments;
