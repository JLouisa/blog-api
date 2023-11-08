import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localHost from "./localHost";
import PropTypes from "prop-types";

function Home({ setBlog }) {
  const [blogs, setBlogs] = useState([]);

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
  const blogHandler = (blog) => {
    setBlog(blog);
  };
  return (
    <section>
      {blogs.map((blog) => {
        return (
          <div key={blog._id} className="blogs">
            <Link to={"/blog/" + blog._id} onClick={() => blogHandler(blog)}>
              <p>{blog.title}</p>
              <p>{blog.text}</p>
            </Link>
          </div>
        );
      })}
    </section>
  );
}

Home.propTypes = {
  setBlog: PropTypes.func,
};

export default Home;
