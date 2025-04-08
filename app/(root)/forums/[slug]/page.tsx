"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import { useForums } from "@/app/context/forums/ForumsContext";
import PageNotFound from "@/app/components/PageNotFound";
import PostComments from "@/app/components/Forums/PostComments";
import AddCommentForm from "@/app/components/Forums/AddCommentForm";
import { useGlobal } from "@/app/context/GlobalContext";

const ForumDetail = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const { formattedDate } = useGlobal();
  const { forumPost, fetchForumPostDetail, error } = useForums();

  useEffect(() => {
    if (!slug) return;
    fetchForumPostDetail(slug);
  }, [slug]);

  if (error || !forumPost) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <div className="min-w-md max-w-xl md:max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white dark:border dark:border-gray-700 shadow-md rounded-lg">
        {/* Judul & Info */}
        <h1 className="text-2xl font-bold">{forumPost.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Oleh <span className="font-semibold">{forumPost?.user?.name}</span> •{" "}
          {formattedDate(forumPost.createdAt)}
        </p>

        {/* Isi Postingan */}
        <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            {forumPost.content}
          </p>
        </div>

        <PostComments />
        <AddCommentForm />
      </div>
    </NormalContent>
  );
};

export default ForumDetail;
