import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Post from "./Post";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";

const POST_ITEM_QUERY = gql`
  query PostItem($id: String!) {
    post(id: $id) {
      id
      title
      content
      postedBy {
        id
        username
      }
      votes {
        postId
        userId
      }
      comments {
        id
        content
        post {
          id
          title
          content
        }
        postedBy {
          username
          id
        }
        comments {
          id
          content
          post {
            id
            title
            content
          }
          postedBy {
            username
          }
          comments {
            id
            content
            post {
              id
              title
              content
            }
            postedBy {
              username
            }
          }
        }
      }
    }
  }
`;

const PostPage = () => {
  const { postId } = useParams();

  const { loading, error, data } = useQuery(POST_ITEM_QUERY, {
    variables: {
      id: postId,
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <main className="list">
      <Post post={data.post} />
      <CreateComment postId={postId} />
      <CommentList comments={data.post.comments} />
    </main>
  );
};

export default PostPage;
