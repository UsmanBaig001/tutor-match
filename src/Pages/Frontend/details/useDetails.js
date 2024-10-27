import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const UseDetails = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    try {
      const userDocRef = doc(firestore, "Teacher", id);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setData(userData);
        } else {
          setData(null);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error listening to user data:", error);
      throw new Error("An error occurred while listening to user data");
    }
  }, []);
  return { data };
};

export default UseDetails;
