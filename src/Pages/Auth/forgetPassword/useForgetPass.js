import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { message } from "antd";

const initialState = {
  email: "",
};
const UseForgetPass = () => {
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  console.log("state", state);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = state;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        message.success("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode && errorMessage);
      });
  };
  return { handleSubmit, handleChange, state };
};

export default UseForgetPass;
