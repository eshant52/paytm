import axios from "axios";
import { redirect } from "react-router-dom";
import { setAuthorizationHeader } from "../auth";

export async function signinAction({ request }) {
  const formData = await request.formData();
  const signinData = Object.fromEntries(formData);
  const url = "http://localhost:3009/api/v1/user/signin";
  let res, resErr, token;

  try {
    res = await axios.post(url, signinData);
    token = res.headers.getAuthorization();
  } catch (err) {
    resErr = err;
  } finally {
    setAuthorizationHeader(token);
  }

  if (res) {
    // return { data: res.data, authorized: true, token: token, error: false };
    return redirect('/dashboard')  
  }

  if (resErr) {
    return { data: resErr.response.data, authorized: false, token: null, error:true };
  }
}

export async function signupAction({ request }) {
  const formData = await request.formData();
  const signupData = Object.fromEntries(formData);
  const url = "http://localhost:3009/api/v1/user/signup";
  let res, resErr, token;

  try {
    res = await axios.post(url, signupData);
    token = res.headers.getAuthorization();
  } catch (err) {
    resErr = err;
  } finally {
    setAuthorizationHeader(token);
  }

  if (res) {
    return { data: res.data, authorized: true, error: false };
  }

  if (resErr) {
    return { data: resErr.response.data, authorized: false, error: true };
  }
}

export async function sendMoneyAction({ request }) {
  const amountData = await request.json();

  const url = "http://localhost:3009/api/v1/account/transfer";
  let res, resErr;

  try {
    res = await axios.post(url, amountData);
  } catch (err) {
    resErr = err;
  }

  if (res) {
    return { data: res.data, error: false };
  }

  if (resErr) {
    return { data: resErr.response.data, error: true };
  }
}

export async function profileAction({request}) {
  const profileChangeData = await request.json();
  const url = "http://localhost:3009/api/v1/user";
  let res, resErr;

  try {
    res = await axios.put(url, profileChangeData);
  } catch (err) {
    resErr = err;
  }

  if (res) {
    return { data: res.data, error: false };
  }

  if (resErr) {
    return { data: resErr.response.data, error: true };
  }
}