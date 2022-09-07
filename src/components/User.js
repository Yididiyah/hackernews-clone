import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const USER_INFO_QUERY = gql`
  query UserInfo($id: String!) {
    user(id: $id) {
      username
      posts {
        id
      }
    }
  }
`;

const User = () => {
  const [searchParams] = useSearchParams();

  const { loading, error, data } = useQuery(USER_INFO_QUERY, {
    variables: {
      id: searchParams.get("id"),
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <main className="list user-info">
      <div className="username">
        <span>user:</span>
        {data.user.username}
      </div>
      <div className="user-meta">
        <span>about:</span>
        <div className="links">
          <Link to={`/submitted`}>submissions</Link>
          <Link to={`/threads`}>comments</Link>
        </div>
      </div>
    </main>
  );
};

export default User;
