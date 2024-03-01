import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Rootlayout from "./_root/Rootlayout";
import Home from "./_root/pages/Home";
import Loader from "../src/components/shared/Loader";
import Error from "./components/shared/Error";
import Dashboard from "./_root/pages/Dashboard";
import Project from "./_root/pages/Project";
import About from "./_root/pages/About";

import AuthLayout from "../src/_auth/AuthLayout";
import Signin from "../src/_auth/forms/Signin";
import Signup from "../src/_auth/forms/Signup";
import Contact from "./_root/pages/Contact";
import SignIn from "../src/_auth/forms/Signin";
import PrivateRoute from "./components/shared/PrivateRoute";
import CreatePost from "./_root/pages/CreatePost";
import AdminOnlyRoute from "./components/shared/AdminOnlyRoute";
import UpdatePost from "./_root/pages/UpdatePost";
import PostDetails from "./_root/pages/PostDetails";

const router = createBrowserRouter([
  {
    element: <Rootlayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: Loader,
      },
      // private route
      {
        path: "/dashboard",
        element: <PrivateRoute />,
        errorElement: <Error />,
        children: [
          {
            path: "",
            element: <Dashboard />,
            loader: Loader,
          },
        ],
      },
      // Admin only private route
      {
        path: "/create-post",
        element: <AdminOnlyRoute />,
        errorElement: <Error />,
        children: [
          {
            path: "",
            element: <CreatePost />,
            loader: Loader,
          },
        ],
      },

      {
        path: "/update-post/:postId",
        element: <AdminOnlyRoute />,
        errorElement: <Error />,
        children: [
          {
            path: "",
            element: <UpdatePost />,
            loader: Loader,
          },
        ],
      },

      {
        path: "/project",
        element: <Project />,
        loader: Loader,
      },
      {
        path: "/about",
        element: <About />,
        loader: Loader,
      },
      {
        path: "/contact",
        element: <Contact />,
        loader: Loader,
      },
      {
        path: "/post/:slug",
        element: <PostDetails />,
        loader: Loader,
      },
    ],
  },

  // Auth routes and layout

  {
    element: <AuthLayout />,
    path: "/auth",
    errorElement: <Error />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
        loader: Loader,
      },
      {
        path: "sign-up",
        element: <Signup />,
        loader: Loader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
