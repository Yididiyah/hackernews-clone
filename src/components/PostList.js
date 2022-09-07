import React from "react";
import Post from "./Post";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";

const POST_LIST_QUERY = gql`
  query PostList {
    posts {
      id
      title
      content
      deleted
      postType
      postedBy {
        id
        username
      }
      comments {
        id
      }
      votes {
        postId
        userId
      }
    }
  }
`;

const PostList = () => {
  const { loading, error, data } = useQuery(POST_LIST_QUERY);
  const { listType } = useParams();

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div className="list">
      {data && (
        <>
          {data.posts.map((post, index) => {
            if (post.deleted) {
              return;
            }
            if (listType && post.postType !== listType) {
              return;
            }
            return <Post num={index + 1} key={post.id} post={post} />;
          })}
        </>
      )}
    </div>
  );
};

export default PostList;
