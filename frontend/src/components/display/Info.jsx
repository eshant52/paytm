/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Info({ sec, children, className }) {
  const [appearance, setAppearance] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(function () {
      setAppearance(false);
    }, sec * 1000);
    return () => {
      clearTimeout(timerId);
    };
  });

  const appearStyle = appearance ? "opacity-100 visible" : "opacity-0 invisble";

  return (
    (
      <div className={`transition-all fixed top-0 mt-10 text-lg text-white ${appearStyle} ${className}`}>
        <span className="bg-gray-600 py-1.5 px-3 rounded-sm">
          {children}
        </span>
      </div>
    )
  );
}
