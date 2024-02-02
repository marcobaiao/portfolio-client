import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./components/common/ErrorPage";
import Homepage from "./pages/frontoffice/Homepage";
import Login from "./pages/backoffice/Login";
import AdminPanel from "./components/backoffice/layout/AdminPanelLayout";
import AdminPanelGeneral from "./pages/backoffice/AdminGeneral";
import NewPost from "./pages/backoffice/NewPost";
import AdminProjectCategories from "./pages/backoffice/AdminProjectCategories";
import Project from "./pages/frontoffice/Project";
import EditProject from "./pages/backoffice/EditProject";
import Post from "./pages/frontoffice/Post";
import EditPost from "./pages/backoffice/EditPost";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import AdminPosts from "./pages/backoffice/AdminPosts";
import AdminProjects from "./pages/backoffice/AdminProjects";
import NewProject from "./pages/backoffice/NewProject";
import AdminPostCategories from "./pages/backoffice/AdminPostCategories";
import Projects from "./pages/frontoffice/Projects";
import Navbar from "./components/frontoffice/nav/Navbar";
import Blog from "./pages/frontoffice/Blog";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/projects/:projectId",
        element: <Project />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/projects",
        element: <Projects />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blog",
        element: <Blog />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: `/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminPanel />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "general",
            element: <AdminPanelGeneral />,
          },
          {
            path: "blog",
            element: <AdminPosts />,
          },
          {
            path: "blog/new",
            element: <NewPost />,
          },
          {
            path: "post/:id/edit",
            element: <EditPost />,
          },
          {
            path: "projects",
            element: <AdminProjects />,
          },
          {
            path: "projects/new",
            element: <NewProject />,
          },
          {
            path: "projects/:projectId/edit",
            element: <EditProject />,
          },
          {
            path: "projectCategories",
            element: <AdminProjectCategories />,
          },
          {
            path: "postCategories",
            element: <AdminPostCategories />,
          },
        ],
      },
      {
        path: "/admin/project/:projectId",
        element: <Project />,
      },
      {
        path: "/admin/post/:postId",
        element: <Post />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
