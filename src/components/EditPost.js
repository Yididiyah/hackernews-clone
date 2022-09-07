import { gql, useMutation, useQuery } from "@apollo/client";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation(
    $id: String!
    $title: String!
    $content: String!
  ) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
      postType
      postedBy {
        username
      }
      comments {
        id
      }
      votes {
        postId
      }
    }
  }
`;

const POST_QUERY = gql`
  query Post($id: String!) {
    post(id: $id) {
      id
      title
      content
    }
  }
`;

const EditPost = () => {
  const { postId } = useParams();

  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: {
      id: postId,
    },
    onCompleted: (data) => {
      setFormState({
        ...formState,
        title: data.post.title,
        content: data.post.content,
      });
    },
  });

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      id: postId,
      title: formState.title,
      content: formState.content,
    },
    onCompleted: () => navigate("/"),
  });
  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost();
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="content">
          Content
        </label>
        <input
          value={formState.content}
          onChange={handleChange}
          name="content"
          type="text"
          placeholder="Description for the post"
          className="form-input"
          id="content"
        />
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          value={formState.title}
          onChange={handleChange}
          name="title"
          type="text"
          placeholder="The URL for the post"
          className="form-input"
          id="title"
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPost;
