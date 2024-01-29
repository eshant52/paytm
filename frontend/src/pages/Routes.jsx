import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Signup from "@pages/unprotected/Signup";
import Signin from "@pages/unprotected/Signin";
import Dashboard from "@pages/protected/Dashboard";
import {
  profileAction,
  sendMoneyAction,
  signinAction,
  signupAction,
} from "@utils/action";
import {
  signinLoader,
  signupLoader,
  dashboardLoader,
  signoutLoader,
  profileLoader,
} from "@utils/loader";
import Main from "./Main";
import NotFound from "./NotFound";
import Profile from "./protected/Profile";

export default function Routes() {
  const publicRoute = [
    {
      path: "publicpage1",
      element: <h1>public page 1</h1>,
    },
    {
      path: "publicpage2",
      element: <h1>public page 2</h1>,
    },
  ];

  const protectedRoute = [
    {
      path: "dashboard",
      element: <Dashboard />,
      loader: dashboardLoader,
    },
    {
      path: "profile",
      element: <Profile />,
      loader: profileLoader,
      action: profileAction,
    },
    {
      path: "signout",
      loader: signoutLoader,
    },
    {
      path: "transaction",
      action: sendMoneyAction,
    },
  ];

  const unprotectedRoute = [
    {
      path: "signin",
      element: <Signin />,
      action: signinAction,
      loader: signinLoader,
    },
    {
      path: "signup",
      element: <Signup />,
      action: signupAction,
      loader: signupLoader,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>main page</h1>,
      loader: () => {
        ("root loader runs 0");
        return redirect("/signin");
      },
    },
    {
      path: "/",
      element: <Main />,
      loader: () => {
        return null;
      },
      children: [...publicRoute, ...protectedRoute, ...unprotectedRoute],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
