import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const Header = ({ setListType }) => {
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
      <div>|</div>
      <Link to="/list/ASK">ask</Link>
      <div>|</div>
      <Link to="/list/SHOW">show</Link>
      <div>|</div>
      <Link to="/list/JOB">job</Link>

      {/* <button type="button" onClick={() => setListType("ASK")}>
        Ask
      </button>
      <div>|</div>
      <button type="button" onClick={() => setListType("SHOW")}>
        Show
      </button>
      <div>|</div>
      <button type="button" onClick={() => setListType("JOB")}>
        Job
      </button> */}

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
