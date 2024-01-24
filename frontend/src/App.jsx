import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Rootlayout from "./_root/Rootlayout";
import Home from "./_root/pages/Home";
import Loader from "../src/components/shared/Loader";
import Error from "./components/shared/Error";
import Dashboard from "./_root/pages/Dashboard";
import Project from "./_root/pages/Project";

import AuthLayout from "../src/_auth/AuthLayout";
import Signin from "../src/_auth/forms/Signin";
import Signup from "../src/_auth/forms/Signup";

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
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: Loader,
      },
      {
        path: "/project",
        element: <Project />,
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
        element: <Signin />,
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
