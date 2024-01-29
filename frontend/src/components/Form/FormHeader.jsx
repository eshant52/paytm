/* eslint-disable react/prop-types */
export default function FormHeader({title, caption}) {
  return (
    <header className=" self-center px-4">
      <h1 className="text-3xl font-bold text-center pb-2">{title}</h1>
      <p className="text-gray-700 text-center font-light">
        {caption}
      </p>
    </header>
  );
}