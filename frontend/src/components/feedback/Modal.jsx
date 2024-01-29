/* eslint-disable react/prop-types */
import FormInput from "@components/FormElements/FormInput";
import Avatar from "../display/Avatar";
import MainForm from "@components/Form";
import FormButton from "@components/FormElements/FormButton";

export default function Modal({ id, name, children }) {
  return (
    <dialog id={id}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black/60">
        <div className="relative transform overflow-hidden rounded-md bg-white text-left drop-shadow-md transition-all sm:my-8">
          <div className="absolute z-30 flex items-center justify-end">
            <form method="dialog" className="p-2">
              <button className="size-6 rounded-full hover:bg-black/20">
                ✕
              </button>
            </form>
          </div>
          {children}
        </div>
      </div>
    </dialog>
  );
}
