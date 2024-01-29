/* eslint-disable react/prop-types */
import FormInput from "@components/FormElements/FormInput";
import MainForm from "@components/Form";
import FormButton from "@components/FormElements/FormButton";
import { Form } from "react-router-dom";

export default function SigninForm({feedback, isSubmitting}) {

  return (
    <MainForm
      id={"sigin-form"}
      method={"post"}
      headerTitle={"Sign in"}
      headerCaption={"Enter your credentials to access your account"}
      footerText={"Don't have an account?"}
      footerLinkto={"/signup"}
      footerLinkText="Sign up"
      feedback={feedback}
      replace={true}
      element={Form}
    >
      <FormInput
        id="input1"
        type="email"
        title="Email"
        placeholder="johndoe@exmaple.com"
        name="username"
      />
      <FormInput
        id="input2"
        type="password"
        title="Password"
        placeholder="******"
        name="password"
      />
      <FormButton id="input3" isSubmitting={isSubmitting}>
        Sign in
      </FormButton>
    </MainForm>
  );
}
