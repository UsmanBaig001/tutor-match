import { message } from "antd";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/cordova";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  currentPass: "",
  newPass: "",
  confirmNewPass: "",
};

const UseChangePass = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );
    const missingCriteria = [];
    if (password.length < minLength) {
      missingCriteria.push("at least 8 characters");
    }
    if (!hasUppercase) {
      missingCriteria.push("at least one uppercase letter");
    }
    if (!hasLowercase) {
      missingCriteria.push("at least one lowercase letter");
    }
    if (!hasNumber) {
      missingCriteria.push("at least one number");
    }
    if (!hasSpecialChar) {
      missingCriteria.push("at least one special character");
    }
    return missingCriteria;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, currentPass, newPass, confirmNewPass } = state;
    if (!email || !currentPass || !newPass || !confirmNewPass) {
      message.warning("Please fill all the fields!");
      return;
    }
    const missingCriteria = isStrongPassword(state.newPass);
    if (missingCriteria.length > 0) {
      message.warning(`Password must contain ${missingCriteria.join(", ")}.`);
      setLoading(false);
      return;
    }
    if (newPass !== confirmNewPass) {
      message.warning("Passwords do not match");
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = state.newPass;
    const credential = EmailAuthProvider.credential(
      user.email,
      state.currentPass
    );
    await reauthenticateWithCredential(user, credential);
    // Change password
    await updatePassword(user, newPassword)
      .then(() => {
        setLoading(false);
        message.success("Password Changed Successfully!");
        navigate("/account");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  return { handleChange, state, handleSubmit, loading };
};

export default UseChangePass;
