import PropTypes from "prop-types";
import CommentCreate from "./CommentCreate";
import formattedDate from "./formattedDate";
import userProfile from "../assets/profile-user3.png";

function Comment({ id, comments, isLogin, setIsLogin }) {
  if (comments === 0) return <div>Loading...</div>;

  return (
    <>
      <div>
        <CommentCreate blogID={id} comments={comments} isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="comment">
            <img src={userProfile} className="commentProfile" />
            <p className="commentTitle">
              {comment.createdByUser.username} - {formattedDate(comment.createdDate)}
            </p>
            <p className="commentText">{comment.text}</p>
          </div>
        );
      })}
    </>
  );
}

Comment.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  id: PropTypes.string,
  isLogin: PropTypes.bool,
  setIsLogin: PropTypes.func,
};

export default Comment;
