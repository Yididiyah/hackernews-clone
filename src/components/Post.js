import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div>
      <div>
        {post.content + " "}
        <a href={post.title} target="_blank">
          {post.title}
        </a>
      </div>
      <div></div>
    </div>
  );
};

export default Post;
