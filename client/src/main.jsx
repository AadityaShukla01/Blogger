import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostAuthor from "./components/PostAuthor";
import AuthorPost from "./pages/AuthorPost";
import CategoryPosts from "./pages/CategoryPosts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Authors from "./pages/Authors";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import UserProvider from "./context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout /></UserProvider>,
    children: [
      {
        index: true,
        element: <Home />,
        path: "/",
      },
      {
        index: true,
        element: <PostDetail />,
        path: "/posts/:id",
      },
      {
        index: true,
        element: <AuthorPost />,
        path: "/posts/users/:id",
      },
      {
        index: true,
        element: <CategoryPosts />,
        path: "/posts/categories/:category",
      },
      {
        index: true,
        element: <Register />,
        path: "/register",
      },
      {
        index: true,
        element: <Login />,
        path: "/login",
      },
      {
        index: true,
        element: <Authors />,
        path: "/authors",
      },
      {
        index: true,
        element: <UserProfile />,
        path: "/profile/:id",
      },
      {
        index: true,
        element: <Dashboard />,
        path: "/myposts/:id",
      },
      {
        index: true,
        element: <CreatePost />,
        path: "/create",
      },
      {
        index: true,
        element: <EditPost />,
        path: "/posts/:id/edit",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
