import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import localHost from "./localHost";
import CommentCreate from "./CommentCreate";
import formattedDate from "./formattedDate";

function Comment({ blog }) {
  const [comments, setComments] = useState(0);
  const [users, setUsers] = useState(0);

  // const getUserNames = async (arr) => {
  //   try {
  //     const arrPromises = arr.map(async (user) => {
  //       const response = await fetch(`${localHost}/v1/api/user/${user.createdByUser}`);
  //       const data = await response.json();
  //       return data;
  //     });

  //     const names = await Promise.all(arrPromises);
  //     console.log("names", names);
  //     setUsers(names);
  //   } catch (error) {
  //     console.error("Error fetching user names:", error);
  //   }
  // };

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
      console.log(blogComments.data[1]);
      setComments(blogComments.data[1]);
      // getUserNames(blogComments.data[1]);
    };
    getComments();
  }, []);
  if (comments === 0) return <div>Loading...</div>;

  return (
    <>
      <div>
        <CommentCreate blogID={blog._id} comments={comments} />
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="comment">
            <p>
              {comment.createdByUser.username} - {formattedDate(comment.createdDate)}
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
