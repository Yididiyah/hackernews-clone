import React from "react";
import { Link } from "react-router-dom";
import Divider from "./Divider";

const SingleComment = ({ comment }) => {
  return (
    <div key={comment.id}>
      <Link to={`/user?id=${comment.postedBy.id}`} className="comment-link">
        {comment.postedBy.username}
      </Link>
      <p className="comment-content">{comment.content}</p>
      <Link
        to={`/reply?id=${comment.id}`}
        state={{ comment: comment }}
        className="comment-link"
      >
        reply
      </Link>
    </div>
  );
};

export default SingleComment;
