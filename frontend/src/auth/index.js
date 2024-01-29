import axios from "axios";

export async function requireAuth() {
  const token = localStorage.getItem("token");
  setAuthorizationHeader(token);
  if (token) {
    const res = await validateToken();
    if (res.isValid) {
      return true;
    } else {
      deleteToken();
      return false;
    }
  } else {
    return false;
  }
}

export function deleteToken() {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
}

export function setToken(token) {
  axios.defaults.headers.common["Authorization"] = token;
  localStorage.setItem("token", token);
}

export function setAuthorizationHeader(token) {
  if (token) {
    setToken(token);
  } else {
    deleteToken();
  }
}

export async function validateToken() {
  const url = "http://localhost:3009/api/v1/auth/validate";
  let res, resErr;
  try {
    res = await axios.get(url);
    res;
    return { isValid: true, response: res, error: null };
  } catch (err) {
    resErr = err;
    resErr;
    return { isValid: false, response: resErr.response, error: resErr };
  }
}
