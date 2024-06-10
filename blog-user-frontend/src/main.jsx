import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./stylesheets/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import HomePage from "./components/HomePage.jsx";
import Posts from "./components/Posts.jsx";
import Postdetail from "./components/Postdetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signin", element: <SignIn /> },
      { path: "posts", element: <Posts /> },
      { path: "/posts/:postID", element: <Postdetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
