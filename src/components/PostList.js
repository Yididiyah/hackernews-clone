import React from "react";
import Post from "./Post";
import { useQuery, gql } from "@apollo/client";

const POST_LIST_QUERY = gql`
  query PostList {
    posts {
      id
      title
      content
    }
  }
`;

const PostList = () => {
  const { data } = useQuery(POST_LIST_QUERY);

  const linksToRender = [
    {
      id: "link-id-1",
      content: "Prisma gives you a powerful database toolkit 😎",
      title: "https://prisma.io",
    },
    {
      id: "link-id-2",
      content: "The best GraphQL client for React",
      title: "https://www.apollographql.com/docs/react/",
    },
  ];

  return (
    <div className="post-list">
      {data && (
        <>
          {linksToRender.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
