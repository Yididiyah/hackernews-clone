import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation(
    $postId: String!
    $commentId: String!
    $content: String!
  ) {
    addComment(postId: $postId, commentId: $commentId, content: $content) {
      id
      content
      postedBy {
        username
      }
    }
  }
`;

const CreateComment = ({ postId, commentId = "" }) => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const [addComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId,
      commentId,
      content: comment,
    },
    onCompleted: () => {
      setComment("");
      if (commentId) {
        navigate(`/item/${postId}`);
      }
    },
  });

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment();
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        name="comment-area"
        id="comment-area"
        cols="30"
        rows="10"
        className="comment-area"
        onChange={handleChange}
        value={comment}
      ></textarea>
      <button className="button comment-btn" type="submit">
        {commentId.length === 0 ? "add comment" : "reply"}
      </button>
    </form>
  );
};

export default CreateComment;
