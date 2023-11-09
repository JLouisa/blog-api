import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localHost from "./localHost";
import PropTypes from "prop-types";

function Home({ isLogin }) {
  const [blogs, setBlogs] = useState(0);
  const [showMore, setShowMore] = useState(5);

  const blogLength = (title) => {
    let newTitle = title;
    if (newTitle.length > 300) {
      return (
        <>
          <p>{newTitle.substring(0, 300) + "..."}</p>
          <p>Show more ⌄</p>
        </>
      );
    }
    return newTitle;
  };

  useEffect(() => {
    const fetchApiBlogs = async () => {
      const response = await fetch(`${localHost}/v1/api/blogs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.data);
        console.log(data);
      } else {
        throw new Error("API call failed");
      }
    };
    fetchApiBlogs();
  }, []);

  const theBlogs = (blogs) => {
    const visibleBlogs = blogs.slice(0, showMore);

    return (
      <>
        {visibleBlogs.map((blog) => (
          <div key={blog._id} className="blogs">
            <Link to={"/blog/" + blog._id}>
              <p>{blog.title}</p>
              <>{blogLength(blog.text)}</>
            </Link>
          </div>
        ))}
      </>
    );
  };

  if (blogs === 0) return <p>Loading Blogs...</p>;

  return (
    <section>
      <div>{theBlogs(blogs)}</div>
      {showMore < blogs.length && (
        <div
          className="showMore"
          onClick={() => {
            setShowMore(showMore + 5);
          }}
        >
          Show More
        </div>
      )}
    </section>
  );
}

Home.propTypes = {
  setBlog: PropTypes.func,
  isLogin: PropTypes.bool,
};

export default Home;
