import { useForums } from "@/app/context/forums/ForumsContext";
import Loading from "@/app/loading";
import React from "react";
import ItemNotFound from "../ItemNotFound";
import PostCard from "./PostCard";

const PostList = () => {
  const { forumPosts, loading } = useForums();

  return (
    <>
      {loading ? (
        <Loading />
      ) : forumPosts.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {forumPosts.map((post) => (
            <PostCard key={post.forumPostId} post={post} />
          ))}
        </div>
      ) : (
        <ItemNotFound
          image_url="/img/pet-not-found.png"
          size={200}
          message="Post Not Found"
        />
      )}
    </>
  );
};

export default PostList;
