import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";

const getTeachersCollection = async () => {
  const collectionRef = collection(firestore, "Teacher");

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

export default getTeachersCollection;
