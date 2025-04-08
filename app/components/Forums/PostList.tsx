import { useForums } from "@/app/context/forums/ForumsContext";
import React from "react";
import ItemNotFound from "../ItemNotFound";
import PostCard from "./PostCard";
import Loading from "../loading";

const PostList = () => {
  const { forumPosts, loading } = useForums();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {forumPosts.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {forumPosts.map((post) => (
            <PostCard key={post.forumPostId} post={post} />
          ))}
        </div>
      ) : (
        <ItemNotFound
          image_url="/img/post-not-found.png"
          size={200}
          message="Post Not Found"
        />
      )}
    </>
  );
};

export default PostList;
