import { useActionData, useNavigation, useLocation } from "react-router-dom";

import Info from "@components/display/Info";
import SigninForm from "../../components/web-ui/signinForm";

export default function Signin() {
  const actionData = useActionData();
  const location = useLocation();
  const navigation = useNavigation();
  // const navigate = useNavigate();
  // const auth = useRecoilValue(authValidate);
  // const setAuthAtom = useSetRecoilState(authAtom);

  const isRedirect = location.state?._isRedirect;
  const isSubmitting = navigation.state === "submitting";
  const error = actionData?.error;
  const message = actionData?.data?.message;

  // if (actionData?.authorized && !auth.isAuth) {
  //   setAuthAtom(actionData?.token);
  // }

  // useEffect(() => {
  //   if (actionData?.authorized && !auth.isAuth) {
  //     setAuthAtom(actionData?.token);
  //     // navigate("/dashboard");
  //   }
  //   ("useEffect runs");
  // }, [setAuthAtom, actionData, auth, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-300">
      {isRedirect && <Info sec={3}>ℹ️ Signin to get back !</Info>}
      <SigninForm
        feedback={error ? message : undefined}
        isSubmitting={isSubmitting}
        onChange={() => {}}
      />
    </div>
  );
}
