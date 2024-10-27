import { message } from "antd";
import { getAuth, sendEmailVerification } from "firebase/auth";

const UseVerfication = () => {
  const auth = getAuth();
  const handleVerify = (e) => {
    e.preventDefault();
    sendEmailVerification(auth.currentUser).then(() => {
      message.success("Email verification sent!");
    });
  };

  return { handleVerify };
};

export default UseVerfication;
