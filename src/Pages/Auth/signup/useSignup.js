import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../config/firebase";
import { useAuthContext } from "../../../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { message } from "antd";
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  name: "",
  address: "",
  lastDegree: "",
  photoURL:
    "https://firebasestorage.googleapis.com/v0/b/teacher-finder-58df9.appspot.com/o/course%2Fp05re9wc3ci.jpg?alt=media&token=b4b75d9b-b803-4e64-90af-116529bfc051",
};
const UseSignup = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    const {
      email,
      password,
      confirmPassword,
      role,
      lastDegree,
      address,
      name,
      photoURL,
    } = formData;
    if (!email || !password || !confirmPassword || !role) {
      message.warning("Please fill all the fields");
      setLoading(false);
      return;
    }
    const missingCriteria = isStrongPassword(formData.password);
    if (missingCriteria.length > 0) {
      message.warning(`Password must contain ${missingCriteria.join(", ")}.`);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      message.warning("Passwords do not match");
      setLoading(false);
      return;
    }
    setLoading(false);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUserProfile(user);
      })
      .catch((err) => {
        message.error("Something went wrong while creating user");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
    const createUserProfile = async (user) => {
      const { email, uid } = user;

      const userData = {
        role: role,
        uid: uid,
        name: name,
        email: email,
        address: address,
        lastDegree: lastDegree,
        photoURL: photoURL,
      };

      try {
        if (role === "Student") {
          await setDoc(doc(firestore, "Student", uid), userData);
          localStorage.setItem("user", JSON.stringify({ role }));
        } else if (role === "Teacher") {
          await setDoc(doc(firestore, "Teacher", uid), userData);
          localStorage.setItem("user", JSON.stringify({ role }));
        } else {
          throw new Error("Invalid role specified");
        }
        dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } });
        message.success("A new user has been created successfully");
        navigate("/auth/login");
      } catch (e) {
        message.error("Something went wrong while creating user profile");
        console.error("Error adding document: ", e);
      }
    };
  };
  return { handleChange, handleSubmit, loading, formData, error };
};

export default UseSignup;
