import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../config/firebase";
import { message } from "antd";

const useModal = ({ props }) => {
  const initialState = {
    name: props?.data?.name,
    city: props?.data?.city,
    charges: props?.data?.charges,
    address: props?.data?.address,
    photoURL: props?.data?.photoURL,
    department: props?.data?.department,
    lastDegree: props?.data?.lastDegree,
    experience: props?.data?.experience,
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = props.data?.uid;
      const collectionName = props.data?.role;
      const {
        name,
        lastDegree,
        address,
        department,
        charges,
        city,
        experience,
      } = state;
      const userDataToUpdate = { name, lastDegree, address, city };
      const teacherDataToUpdate = {
        name,
        lastDegree,
        address,
        department,
        charges,
        experience,
      };
      const docRef = doc(firestore, collectionName, id);
      if (props.data?.role === "Teacher") {
        await updateDoc(docRef, teacherDataToUpdate);
        message.success("Teacher data updated successfully");
        console.log("Teacher data updated successfully");
      } else {
        await updateDoc(docRef, userDataToUpdate);
        message.success("Student data updated successfully");
        console.log("Student data updated successfully");
      }
    } catch (error) {
      message.error("Error updating user data:");
      console.error("Error updating user data:", error);
    } finally {
      setLoading(false);
      props.close();
    }
  };
  return { handleChange, state, handleSubmit, loading };
};

export default useModal;
