import { useRecoilValueLoadable } from "recoil";
import { balanceAtom } from "@utils/atom";

/* eslint-disable react/prop-types */
export default function ShowBalance() {
  const balance = useRecoilValueLoadable(balanceAtom);
  let balanceUI;

  if (balance.state === 'loading') {
    balanceUI = (<span>Loading....</span>);
  } else if (balance.state === 'hasValue') {
    balanceUI = (<span className="">₹ {balance.contents.toFixed(4)}</span>)
  }

  return (
    <div className="flex items-baseline space-x-3 py-5">
      <h1 className="text-lg font-bold">Your Balance:</h1>
      {balanceUI}      
    </div>
  );
}
