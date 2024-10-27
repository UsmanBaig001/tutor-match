import { firestore } from "../config/firebase";

export const addResultToCollection = async (result) => {
  try {
    await firestore.collection("Results").add(result);
  } catch (error) {
    throw new Error("Error adding result: ", error);
  }
};

export const getResultsForStudent = async (studentId) => {
  try {
    const querySnapshot = await firestore
      .collection("Results")
      .where("studentId", "==", studentId)
      .get();

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw new Error("Error fetching results: ", error);
  }
};
