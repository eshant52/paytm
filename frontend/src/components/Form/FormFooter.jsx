import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function FormFooter({text, linkText, to}) {
  return (
    <footer className="text-sm text-center space-x-1">
      <span>{text}</span>
      <Link to={to} className=" underline">
        {linkText}
      </Link>
    </footer>
  );
}