/* eslint-disable react/prop-types */
export default function FormInput({id, type, placeholder, name, title, className, ...props}) {
  return (
    <div className="space-y-2">
      {title && <label htmlFor={id} className="block font-semibold text-sm">{title}</label>}
      <input id={id} type={type} name={name} placeholder={placeholder} {...props} className={`border rounded-md py-2.5 px-3.5 bg-white text-sm placeholder:text-sm w-full focus:outline-black ${className}`}/>
    </div>
  );
}