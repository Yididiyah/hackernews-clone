import React, { useState } from "react";
import { useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN, USER_ID } from "../constants";

const SIGN_UP_MUTATION = gql`
  mutation SignupMutation($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    username: "",
    password: "",
  });
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      localStorage.setItem(USER_ID, login.user.id);
      navigate("/");
    },
  });
  const [signup] = useMutation(SIGN_UP_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate("/");
    },
  });
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4>{formState.login ? "Login" : "Sign Up"}</h4>
      <div>
        <label className="form-label" htmlFor="username">
          username
        </label>
        <input
          value={formState.username}
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Your username"
          className="form-input"
          id="username"
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          value={formState.password}
          onChange={handleChange}
          name="password"
          type="text"
          placeholder="Choose a safe password"
          className="form-input"
          id="password"
        />
      </div>
      <div>
        <button
          type="button"
          className="button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? "login" : "create account"}
        </button>
        <button
          type="button"
          className="button"
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "need to create an account"
            : "already have an account"}
        </button>
      </div>
    </form>
  );
};

export default Login;
