import Comment from "./Comment";
import PropTypes from "prop-types";

function Blog({ blog }) {
  return (
    <section>
      <h1>{blog.title}</h1>
      <h2>{blog._id}</h2>
      <p>{blog.text}</p>
      <Comment blog={blog} />
    </section>
  );
}

Blog.propTypes = {
  blog: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Blog;
