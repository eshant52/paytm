import { authValidate } from "@auth/atom";
import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function Main() {
  const { isAuth } = useRecoilValue(authValidate);
  const navigation = useNavigation();
  const isDashboard = navigation.location?.pathname === '/';

  return isAuth ? (
    <main>
      {isDashboard && <Navigate to={"/dashboard"} />}
      <Outlet />
    </main>
  ) : (
    <Navigate to={"/signin"} replace />
  );
}
