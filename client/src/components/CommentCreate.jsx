import { useState } from "react";
import PropTypes from "prop-types";
import Login from "./Login";

function CommentCreate({ blogID, comments, isLogin, setIsLogin }) {
  console.log(isLogin);
  const [showCommentArea, setShowCommentArea] = useState(false);

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
  if (isLogin === false) {
    return (
      <>
        <Login link={`/blog/${blogID}`} setIsLogin={setIsLogin} redirect={false} />
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
  isLogin: PropTypes.bool,
  setIsLogin: PropTypes.func,
};

export default CommentCreate;
