import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { TOKEN } from "../const";

const Layout = lazy(() => import("../components/Layout"));
const Bootcamps = lazy(() => import("../pages/Bootcamps"));
const Users = lazy(() => import("../pages/Users"));
const Courses = lazy(() => import("../pages/Courses"));
const Login = lazy(() => import("../pages/Login"));

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/layout",
    element: <Layout />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Bootcamps />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/bootcamps",
        element: <Bootcamps />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
    ],
  },
];

const Routes = () => {
  const elements = useRoutes(routes);
  return elements;
};

export default Routes;
