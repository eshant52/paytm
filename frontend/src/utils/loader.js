import { deleteToken, requireAuth } from "@auth/index";
import { redirect } from "react-router-dom";

export async function dashboardLoader() {
  const isAuthorized = await requireAuth();
  if (!isAuthorized) return redirect("/signin"); // If not logged in, don't load the page.
  return null;
}

export async function signinLoader() {
  const isAuthorized = await requireAuth();
  if (isAuthorized) return redirect("/dashboard"); // If already logged in, send
  return null;
}

export async function signupLoader() {
  const isAuthorized = await requireAuth();
  if (isAuthorized) return redirect("/dashboard");
  return null;
}

export async function signoutLoader() {
  deleteToken();
  return redirect('/signin');
}

export async function profileLoader() {
  const isAuthorized = await requireAuth();
  if(!isAuthorized) return redirect('/signin');
  return null;
}
