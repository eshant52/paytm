/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function MenuButton({
  children,
  className,
  buttonContent,
  handleClick,
}) {
  return (
    <div className="relative space-y-2">
      <button className={className} onClick={handleClick}>
        {buttonContent}
      </button>
      {children}
    </div>
  );
}

export function Menu({ children, className, show }) {
  const visibleState = show
    ? "visible opacity-100 translate-y-1"
    : "invisible opacity-0 translate-y-0";
  return (
    <div
      className={`absolute right-0 z-10 flex w-36  flex-col divide-y-[0.1rem] rounded-sm border border-none bg-slate-50 drop-shadow-md transition ease-in-out ${visibleState} ${className}`}
    >
      {children}
    </div>
  );
}

export function MenuItem({ children, to, className, icon }) {
  return (
    <Link
      to={to}
      className={`flex space-x-2 px-5 py-1.5 text-sm text-neutral-900 hover:bg-slate-100 ${className}`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
