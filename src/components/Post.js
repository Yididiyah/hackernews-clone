import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN, USER_ID } from "../constants";
import Divider from "./Divider";

const UPVOTE_MUTATION = gql`
  mutation UpvoteMutation($postId: String!) {
    upvote(postId: $postId) {
      postId
      userId
    }
  }
`;
const REMOVE_UPVOTE_MUTATION = gql`
  mutation RemoveUpvoteMutation($postId: String!) {
    removeUpvote(postId: $postId) {
      postId
      userId
    }
  }
`;
const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const Post = ({ num, post }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const userId = localStorage.getItem(USER_ID);
  const navigate = useNavigate();
  const [upvote] = useMutation(UPVOTE_MUTATION, {
    variables: {
      postId: post.id,
    },
    onCompleted: () => navigate("/"),
  });
  const [removeUpvote] = useMutation(REMOVE_UPVOTE_MUTATION, {
    variables: {
      postId: post.id,
    },
    onCompleted: () => navigate("/"),
  });
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      id: post.id,
    },
  });

  const checkUpvote = (arr) => {
    const isUpvotted = arr.some(
      (vote) => vote.postId === post.id && vote.userId === userId
    );
    return isUpvotted;
  };
  const checkIfCurrentUserPost = (id) => {
    return post.postedBy.id === id;
  };
  const upvotted = checkUpvote(post.votes);
  const myPost = checkIfCurrentUserPost(userId);

  return (
    <div>
      <div className="md">
        {num && <span className="grey">{num}. &nbsp;</span>}
        {authToken && (
          <button className="link-btn grey" onClick={() => upvote()}>
            ▲
          </button>
        )}
        {post.content + " "}
        <a href={post.title} target="_blank" rel="noreferer" className="link">
          ({post.title})
        </a>
      </div>
      <div className="sm post-bottom">
        <span>
          by &nbsp;
          <Link to={`/user?id=${post.postedBy.id}`} className="link grey">
            {post.postedBy.username}
          </Link>{" "}
        </span>
        {myPost && (
          <span>
            <Divider />
            <Link to={`/edit/${post.id}`} className="link grey">
              update
            </Link>
            <Divider />
            <button className="link-btn grey" onClick={deletePost}>
              delete
            </button>
          </span>
        )}
        {upvotted && (
          <>
            <Divider />
            <button className="link-btn grey" onClick={removeUpvote}>
              unvote
            </button>
          </>
        )}

        <Divider />
        <Link to={`/item/${post.id}`} className="link grey">
          {post.comments.length > 0 ? post.comments.length : "no"} comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
