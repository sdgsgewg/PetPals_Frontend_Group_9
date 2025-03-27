import IForumPost from "@/app/interface/forum/IForumPost";
import Link from "next/link";

interface PostCardProps {
  post: IForumPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Link
      href={`/forums/${post.slug}`}
      className="block border-b p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Oleh {post.user.name} • {formatDate(post.createdAt)}
      </p>
    </Link>
  );
};

export default PostCard;
