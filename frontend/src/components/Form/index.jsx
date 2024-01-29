/* eslint-disable react/prop-types */
import FormFooter from "@components/Form/FormFooter";
import FormHeader from "@components/Form/FormHeader";
import { Form } from "react-router-dom";
import { createElement } from "react";

export default function MainForm({
  id,
  method,
  headerTitle,
  headerCaption,
  children,
  footerText,
  footerLinkto,
  footerLinkText,
  feedback,
  className,
  onChange,
  element='form',
  ...props
}) {
  return (
    <div
      className={`flex flex-col justify-center bg-white rounded-lg px-6 py-6 w-[24rem] space-y-5 ${className || ""}`}
    >
      {(headerTitle || headerCaption) && (
        <FormHeader title={headerTitle} caption={headerCaption} />
      )}
      {createElement(
        element,
        {
          id,
          method,
          className: "space-y-5",
          onChange,
          ...props
        },
        children
      )}
      {(footerText || footerLinkto || footerLinkText) && (
        <FormFooter
          to={footerLinkto}
          text={footerText}
          linkText={footerLinkText}
        />
      )}
      {feedback && (
        <div className="bg-red-400 text-center rounded-full px-3 pt-0.5 pb-1">
          <span className=" text-sm text-white">
            {"⚠️ " + feedback}
          </span>
        </div>
      )}
    </div>
  );
}
