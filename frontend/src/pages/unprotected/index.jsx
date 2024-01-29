import { authValidate } from "@auth/atom";
import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function UnprotectedMain() {
  const { isAuth } = useRecoilValue(authValidate);
  const navigation = useNavigation();
  const isSignin = navigation.location?.pathname === '/';

  return isAuth ? 
    <Navigate to={"/dashboard"} />
   : (
    <main>
      {isSignin && <Navigate to={"/signin"} />}
      <Outlet />
    </main>
  );
}
