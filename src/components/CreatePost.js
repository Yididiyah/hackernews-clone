import { gql, useMutation } from "@apollo/client";

import React, { useState } from "react";
import { useNavigate } from "react-router";

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
      postType
      postedBy
      comments
      votes
    }
  }
`;

const CreatePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      title: formState.title,
      content: formState.content,
    },
    onCompleted: () => navigate("/"),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="content">
          Content
        </label>
        <input
          value={formState.value}
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
          value={formState.value}
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

export default CreatePost;
