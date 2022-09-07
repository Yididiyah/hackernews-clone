import { gql, useMutation } from "@apollo/client";

import React, { useState } from "react";
import { useNavigate } from "react-router";

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation(
    $title: String!
    $content: String!
    $postType: PostType
  ) {
    createPost(title: $title, content: $content, postType: $postType) {
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

const CreatePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    postType: "MAIN",
  });
  const navigate = useNavigate();

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      title: formState.title,
      content: formState.content,
      postType: formState.postType,
    },
    onCompleted: () => navigate("/"),
  });
  console.log("formState", formState);
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

        <label className="form-label" htmlFor="post-type">
          Post Type
        </label>
        <select
          value={formState.postType}
          onChange={handleChange}
          name="postType"
          id="post-type"
          className="post-type"
        >
          <option value="MAIN"> Main</option>
          <option value="JOB"> Job</option>
          <option value="ASK"> Ask</option>
          <option value="SHOW"> Show</option>
        </select>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
