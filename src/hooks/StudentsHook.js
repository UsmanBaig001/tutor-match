import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";

const getStudentsCollection = async () => {
  const collectionRef = collection(firestore, "Student");

  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

export default getStudentsCollection;
