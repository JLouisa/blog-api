import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import localHost from "./localHost";
import CommentCreate from "./CommentCreate";

function Comment({ blog }) {
  const [comments, setComments] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      const blogCommentsData = await fetch(`${localHost}/v1/api/blog/${blog._id}/comments`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const blogComments = await blogCommentsData.json();
      setComments(blogComments.data[1]);
    };
    getComments();
  }, []);
  console.log(comments);
  if (comments === 0) return <div>Loading...</div>;

  return (
    <>
      <div>
        <CommentCreate />
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment._id}>
            <p>
              {comment.createdByUser} - {comment.createdDate}
            </p>
            <p>{comment.text}</p>
          </div>
        );
      })}
    </>
  );
}

Comment.propTypes = {
  blog: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Comment;