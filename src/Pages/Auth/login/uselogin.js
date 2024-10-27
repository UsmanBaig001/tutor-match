import { useState } from "react";
import { auth, firestore } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthContext } from "../../../contexts/AuthContext";
import { message } from "antd";

const Uselogin = () => {
  const { readUserProfile } = useAuthContext();
  const [state, setState] = useState({
    email: "",
    password: "",
    roll: "",
  });
  const [loading, setLoading] = useState(false);
  // const [errorAlert, setErrorAlert] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password, roll } = state;
    if (!state.roll) {
      console.log("Roll is Empty!");
    }
    localStorage.removeItem("user");
    const userCollection = collection(firestore, roll || "Admin");
    const q = query(userCollection, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (!roll) {
              let role = roll || "Admin";
              localStorage.setItem("user", JSON.stringify({ role }));
            } else {
              let role = roll;
              localStorage.setItem("user", JSON.stringify({ role }));
            }
            readUserProfile(user);
            if (!user.emailVerified) {
              message.warning("Please verify your email before logging in...");
              // setError("Please verify your email before logging in...");
              navigate("/auth/verification");
              console.log("Please verify your email before logging in...");
            } else {
              console.log("Email is Verified");
              message.success("Login Successful!");
            }
          })
          .catch((err) => {
            message.error("Something went wrong while signing user");
            console.error(err);
          });
      } else {
        message.error("User not found");
      }
    } catch (err) {
      console.error("Error searching for user:", err);
      message.error("Error searching for user");
    } finally {
      setLoading(false);
    }
  };

  return { handleChange, handleSubmit, loading, state, error };
};

export default Uselogin;
