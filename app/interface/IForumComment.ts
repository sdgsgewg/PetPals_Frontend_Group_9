interface IForumComment {
  forumCommentId: number;
  post_id: number;
  user_id: number;
  comment: string;
  createdAt: string;
}

export default IForumComment;
