import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../config/firebase";
import { message } from "antd";
import { useAuthContext } from "../../contexts/AuthContext";
import generateUid from "../../utils/uid";

const useReviewModal = ({ props }) => {
  const { user } = useAuthContext();
  const initialState = {
    name: user.name,
    city: user.address,
    photoURL: user.photoURL,
    role: user.role,
    description: "",
    rating: 1,
  };
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleChange = (e, newValue) => {
    const { name, value } = e.target || { name: "rating", value: newValue };
    setState((s) => ({
      ...s,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if ((!state.name, !state.city, !state.photoURL)) {
        return message.error("User Data is Missing!");
      }
      const { name, city, photoURL, rating, role } = state;
      const review = {
        name,
        city,
        photoURL,
        rating,
        role,
        courseId: props.data.uid,
      };
      const docRef = doc(firestore, "Reviews", generateUid());
      await setDoc(docRef, review);
      message.success("Review added successfully");
      setState(initialState);
    } catch (error) {
      message.error("Error adding review");
      console.error("Error adding review:", error);
    } finally {
      props.close();
      setLoading(false);
    }
  };
  return { handleChange, state, handleSubmit, loading };
};

export default useReviewModal;
