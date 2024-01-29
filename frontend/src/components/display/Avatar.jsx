/* eslint-disable react/prop-types */
export default function Avatar({text, className}) {
  return (
    <div className={`flex shrink-0 justify-center items-center rounded-full bg-slate-100 size-10 ${className || ""}`}>
      <span>{text[0].toUpperCase()}</span>
    </div>
  );
}