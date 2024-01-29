/* eslint-disable react/prop-types */
export default function Button({ id, type, children, className, ...props}) {
  return (
    <button
      id={id}
      type={type || "submit"}
      className={`bg-black text-white py-2.5 px-3.5 rounded-md text-sm hover:bg-black/90 focus:ring-1 ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
