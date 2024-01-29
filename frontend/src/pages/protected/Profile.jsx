import MainForm from "@components/Form";
import FormButton from "@components/FormElements/FormButton";
import FormInput from "@components/FormElements/FormInput";
import Avatar from "@components/display/Avatar";
import { userAtom } from "@utils/atom";
import { useRecoilState } from "recoil";
import { useSubmit, useActionData, useNavigation, Form } from "react-router-dom";
import Info from "@components/display/Info";
import { useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useRecoilState(userAtom);
  const actionRes = useActionData();
  const submit = useSubmit();
  const navigation = useNavigation();

  const isErr = actionRes?.error;
  const message = actionRes?.data?.message;

  useEffect(() => {
    if (!isErr && actionRes) {
      setUser(prev => ({...prev, ...navigation.json}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErr, actionRes]);


  function handleSubmit(e) {
    const data = {};
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    if (
      user.firstname !== formdata.get("firstname") &&
      formdata.get("firstname") !== ""
    ) {
      data["firstname"] = formdata.get("firstname");
    }

    if (
      user.lastname !== formdata.get("lastname") &&
      formdata.get("lastname") !== ""
    ) {
      data["lastname"] = formdata.get("lastname");
    }

    if (formdata.get("password")?.trim() !== "" && formdata.get("password")) {
      data["password"] = formdata.get("password");
    }

    if (Object.keys(data).length) {
      submit(data, {
        method: "put",
        encType: "application/json",
      });
    }
  }

  return (
    <div className=" mt-16 flex items-center justify-center">
      {!isErr && message && navigation.state === "idle" && (
        <Info sec={3}>{message}</Info>
      )}
      <MainForm
        headerTitle={"Profile"}
        method={"put"}
        footerText={"Go back to"}
        footerLinkto={"/dashboard"}
        footerLinkText={"Dashboard"}
        onSubmit={handleSubmit}
        feedback={isErr ? message : undefined}
        element={Form}
      >
        <div className="flex justify-center">
          <Avatar
            text={user.firstname}
            className={" size-24 text-3xl font-medium"}
          />
        </div>
        <FormInput
          id={"input-1"}
          name={"username"}
          type={"email"}
          title={"User Name"}
          value={user.username}
          disabled
          className={"bg-gray-100"}
        ></FormInput>
        <FormInput
          id={"input-2"}
          name={"firstname"}
          type={"text"}
          title={"First Name"}
          placeholder={user.firstname}
          className={"placeholder:text-black/70"}
        ></FormInput>
        <FormInput
          id={"input-3"}
          name={"lastname"}
          type={"text"}
          title={"Last Name"}
          placeholder={user.lastname}
          className={"placeholder:text-black/70"}
        ></FormInput>
        <FormInput
          id={"input-4"}
          name={"password"}
          type={"password"}
          title={"Password"}
          placeholder={"Change password"}
        ></FormInput>
        <FormButton
          id={"input-5"}
          isSubmitting={navigation.state === "submitting"}
        >
          Submit
        </FormButton>
      </MainForm>
    </div>
  );
}
