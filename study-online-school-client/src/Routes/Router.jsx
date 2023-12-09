import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import AllAssignment from "../Pages/Assignment/AllAssignment";
import CreateAssignment from "../Pages/Assignment/CreateAssignment";
import UpdateAssignment from "../Pages/Assignment/UpdateAssignment";
import ViewAssignment from "../Pages/Assignment/ViewAssignment";

import Error from "../Components/Error";
import PrivetRoute from "./PrivetRoute";
import Submitted from "../Pages/Assignment/Submitted";
import MyAssignment from "../Pages/Assignment/MyAssignment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "all-assignment",
        element: <AllAssignment></AllAssignment>,
      },
      {
        path: "create-assignment",
        element: (
          <PrivetRoute>
            <CreateAssignment></CreateAssignment>
          </PrivetRoute>
        ),
      },
      {
        path: "view-assignment/:_id",
        element: (
          <PrivetRoute>
            <ViewAssignment></ViewAssignment>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://study-online-school-server.vercel.app/api/v1/single-assignment/${params._id}`
          ),
      },
      {
        path: "update-assignment/:_id",
        element: (
          <PrivetRoute>
            <UpdateAssignment></UpdateAssignment>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://study-online-school-server.vercel.app/api/v1/single-assignment/${params._id}`
          ),
      },
      {
        path: "submitted-assignment",
        element: (
          <PrivetRoute>
            <Submitted></Submitted>
          </PrivetRoute>
        ),
      },
      {
        path: "my-assignment",
        element: (
          <PrivetRoute>
            <MyAssignment></MyAssignment>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
