/* eslint-disable react/prop-types */
import Header from "./Header";
import SearchAccount from "./SearchAccount";
import ShowBalance from "./ShowBalance";
export default function DashboardLayout() {
  ("Dashboard renders");
  return (
    <div className=" divide-y-[0.1rem]">
      <Header />
      <main className="space-y-5 px-5">
        <ShowBalance />
        <SearchAccount />
      </main>
    </div>
  );
}
