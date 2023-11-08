import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "../App";
import Blog from "./Blog.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import { useState } from "react";

const Router = () => {
  const [blog, setBlog] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home setBlog={setBlog} /> },
        { path: "/login", element: <Login /> },
        { path: "/blog/:id", element: <Blog blog={blog} /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
