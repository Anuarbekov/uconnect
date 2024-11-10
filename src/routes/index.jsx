import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages";
import Register from "../pages/Register";
const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} className="font-S" />;
};

export default Routes;
