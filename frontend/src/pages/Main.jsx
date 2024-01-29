import Spinner from "@components/display/Spinner";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function Main() {

  return (
    <main>
      
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </main>
  );
}
