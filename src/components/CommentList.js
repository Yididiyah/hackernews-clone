import React from "react";

import SingleComment from "./SingleComment";

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <SingleComment comment={comment} />
            <div className="replyA">
              {comment?.comments
                ? comment?.comments.map((replyA) => {
                    return (
                      <div key={replyA.id}>
                        <SingleComment key={replyA.id} comment={replyA} />
                        <div className="replyB">
                          {replyA?.comments
                            ? replyA?.comments.map((replyB) => {
                                return (
                                  <SingleComment
                                    key={replyB.id}
                                    comment={replyB}
                                  />
                                );
                              })
                            : null}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
