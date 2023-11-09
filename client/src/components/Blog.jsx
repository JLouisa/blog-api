import { useEffect, useState } from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import localHost from "./localHost";
import BlogContent from "./BlogContent";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      try {
        const blogCommentsData = await fetch(`${localHost}/v1/api/blog/${id}/comments`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const blogComments = await blogCommentsData.json();
        console.log(blogComments.data);
        setBlog(blogComments.data[0]);
        setComments(blogComments.data[1]);
      } catch (error) {
        // Log the error and handle it gracefully
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, []);

  if (blog === 0) return <div>Loading...</div>;

  return (
    <section className="blog-post">
      <div className="blog-content">
        <h2>{blog[0].title}</h2>
        <BlogContent content={blog[0].text} />
      </div>
      <div className="commentSection">
        <Comment id={id} comments={comments} />
      </div>
    </section>
  );
}

Blog.propTypes = {
  blog: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Blog;
