import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";

const Reply = () => {
  const location = useLocation();

  const { comment } = location.state;

  return (
    <main className="list">
      <Link to={`/user/${comment.postedBy.id}`} className="comment-link">
        {comment.postedBy.username}
      </Link>
      &nbsp;
      <Link to={`/item/${comment.post.id}`} className="comment-link">
        <span>|</span>
        &nbsp;
        <span>on: &nbsp;</span>
        {comment.post.content}
      </Link>
      <p className="comment-content">{comment.content}</p>
      <CreateComment commentId={comment.id} postId={comment.post.id} />
    </main>
  );
};

export default Reply;
