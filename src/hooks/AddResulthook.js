import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../config/firebase";

export const addResultToCollection = async (resultData) => {
  try {
    console.log("cheen tapak dam dam");
    const docRef = await addDoc(collection(firestore, "results"), resultData);
    console.log("Document written with ID: ", docRef.id);
    console.log("Document Reference =>", docRef);
  } catch (error) {
    console.error("Error adding result: ", error);
    throw new Error("Error adding result: " + error.message);
  }
};
