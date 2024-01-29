/* eslint-disable react/prop-types */
import FormButton from "@components/FormElements/FormButton";
import FormInput from "@components/FormElements/FormInput";
import MainForm from "@components/Form";
import { Form } from "react-router-dom";

export default function SignupForm({ feedback, isSubmitting, onChange }) {

  return (
    <MainForm
      id={"signup-form"}
      method={"post"}
      headerTitle={"Sign Up"}
      headerCaption={"Enter your information to create an account"}
      footerText={"Already have an account?"}
      footerLinkto={"/signin"}
      footerLinkText="Login"
      feedback={feedback}
      replace={true}
      onChange={onChange}
      element={Form}
    >
      <FormInput
        id="input1"
        type="text"
        title="First Name"
        placeholder="John"
        name="firstname"
      />
      <FormInput
        id="input2"
        type="text"
        title="Last Name"
        placeholder="Doe"
        name="lastname"
      />
      <FormInput
        id="input3"
        type="email"
        title="Email"
        placeholder="johndoe@exmaple.com"
        name="username"
      />
      <FormInput
        id="input4"
        type="password"
        title="Password"
        placeholder="******"
        name="password"
      />
      <FormButton id="input5" isSubmitting={isSubmitting}>
        Sign Up
      </FormButton>
    </MainForm>
  );
}
