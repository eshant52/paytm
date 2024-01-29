/* eslint-disable react/prop-types */
import Button from "@components/input/Button";
import Avatar from "../../display/Avatar";
import Modal from "../../feedback/Modal";
import { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { balanceAtom } from "@utils/atom";
import MainForm from "@components/Form";
import FormButton from "@components/FormElements/FormButton";
import FormInput from "@components/FormElements/FormInput";
import { useFetcher } from "react-router-dom";
import Info from "@components/display/Info";

export default function ResultDisplay({
  id,
  userId,
  firstname,
  lastname,
  username,
}) {
  const fetcher = useFetcher();
  const refreshBalance = useRecoilRefresher_UNSTABLE(balanceAtom);

  const name = `${firstname} ${lastname}`;
  const modalId = `modal-${id}`;
  const isSuccess =
    !fetcher.data?.error && fetcher.data && fetcher.state === "idle";

  fetcher;

  useEffect(() => {
    if (isSuccess) {
      refreshBalance();
    }
  }, [isSuccess, refreshBalance]);

  function handleTransfer(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount");
    fetcher.submit(
      { amount: Number(amount), to: userId },
      { encType: "application/json", method: "post", action: "/transaction" },
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Avatar text={firstname} />
      <h3 className={`w-40 min-w-40 truncate font-semibold`} title={name}>
        {name}
      </h3>
      <div
        title={username}
        className="flex min-w-40 shrink grow items-center justify-center  truncate px-4 "
      >
        <span className={`truncate text-sm text-gray-700`}>{username}</span>
      </div>
      <Button onClick={() => document.getElementById(modalId).showModal()}>
        Send Money
      </Button>
      <Modal id={modalId} userId={userId} name={name}>
        {isSuccess && (
          <Info
            className={"mt-1 flex w-full items-center justify-center"}
            sec={3}
          >
            {`✅ ${fetcher.data?.data.message}`}
          </Info>
        )}
        <MainForm
          headerTitle={"Send Money"}
          className={"px-8 pb-8 pt-16"}
          method={"post"}
          onSubmit={handleTransfer}
          element={fetcher.Form}
        >
          <div className="flex items-center space-x-4 pt-8">
            <Avatar text={name} className={"bg-green-500 text-lg text-white"} />
            <h1 className="text-xl font-semibold">{name}</h1>
          </div>
          <FormInput
            id={"amount"}
            type={"number"}
            title={"Amount (in Rs)"}
            name={"amount"}
            placeholder={"Enter amount"}
            className={" focus:outline-green-600"}
            min={1}
          />
          <FormButton
            id={"button-tranfer"}
            type={"submit"}
            isSubmitting={fetcher.state === "submitting"}
            className={"bg-green-500 hover:bg-green-600"}
          >
            Initiate Transfer
          </FormButton>
        </MainForm>
      </Modal>
    </div>
  );
}
