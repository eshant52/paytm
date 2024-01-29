import { Navigate, useActionData, useNavigation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authValidate } from "@auth/atom";
import SignupForm from "@components/web-ui/signupForm";

export default function Signup() {
  const auth = useRecoilValue(authValidate);
  const actionData = useActionData();
  const navigation = useNavigation();

  const message = actionData?.data?.message;
  const isSubmitting = navigation.state === "submitting";

  return auth.isAuth ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <div className=" flex h-screen justify-center items-center bg-slate-300">
      <SignupForm feedback={message} isSubmitting={isSubmitting} />
    </div>
  );
}
