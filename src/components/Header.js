import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate("/");
  };
  return (
    <div className="nav-bar orange">
      <Link to="/" className="bold">
        Hacker News
      </Link>

      <Link to="/">new</Link>

      {authToken && (
        <>
          <div>|</div>
          <Link to="/submit">submit</Link>
        </>
      )}
      <div className="push-right">
        {authToken ? (
          <button className="link-btn" type="button" onClick={logout}>
            logout
          </button>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
