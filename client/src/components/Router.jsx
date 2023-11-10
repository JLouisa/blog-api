import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "../App";
import Blog from "./Blog.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import { useState, useEffect } from "react";

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("projectX");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App isLogin={isLogin} />,
      children: [
        { path: "", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home isLogin={isLogin} /> },
        { path: "/signup", element: <SignUp /> },
        {
          path: "/login",
          element: <Login isLogin={isLogin} setIsLogin={setIsLogin} redirect={true} />,
        },
        { path: "/blog/:id", element: <Blog isLogin={isLogin} setIsLogin={setIsLogin} /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
