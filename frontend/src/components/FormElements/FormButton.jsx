import Spinner from "@components/display/Spinner";

/* eslint-disable react/prop-types */
export default function FormButton({ id, type, children, className, isSubmitting, ...props }) {
  return (
    <button
      id={id}
      type={type || "submit"}
      className={`flex justify-center items-center bg-black text-white py-2.5 px-3.5 rounded-md text-sm w-full hover:bg-black/90 focus:ring-1 ${className || ""}`}
      disabled={isSubmitting}
      {...props}
    >
      {isSubmitting ? <Spinner /> : children}
    </button>
  );
}