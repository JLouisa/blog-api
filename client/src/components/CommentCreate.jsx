import { useState } from "react";
import PropTypes from "prop-types";
import Login from "./Login";

function CommentCreate({ blogID, comments }) {
  const [showCommentArea, setShowCommentArea] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const showCommentHandler = () => {
    setShowCommentArea(!showCommentArea);
  };

  if (showCommentArea === false) {
    return (
      <>
        <div>
          <button className="btn" onClick={showCommentHandler}>
            {comments.length === 0 ? "Be the first to comment!" : "Place a comment"}
          </button>
        </div>
      </>
    );
  }
  if (showLogin === false) {
    return (
      <>
        <Login link={`/blog/${blogID}`} />
      </>
    );
  }
  return (
    <>
      <div>
        <form action={`/api/blog/${blogID}/comment`} method="POST">
          <div>
            <label htmlFor="comment">Place your Comments</label>
            <br />
            <textarea name="comment" id="comment" cols="70" rows="10" placeholder="Add a comment"></textarea>
          </div>
          <div>
            <input type="submit" value="Comment" className="btn" />
            <button className="btn" onClick={showCommentHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

CommentCreate.propTypes = {
  blogID: PropTypes.string,
  comments: PropTypes.array,
};

export default CommentCreate;
