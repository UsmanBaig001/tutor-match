import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

const getStudentById = async (studentId) => {
  try {
    const studentDocRef = doc(firestore, "Student", studentId);
    const studentDocSnap = await getDoc(studentDocRef);

    if (studentDocSnap.exists()) {
      return { id: studentDocSnap.id, ...studentDocSnap.data() };
    }

    const teacherDocRef = doc(firestore, "Teacher", studentId);
    const teacherDocSnap = await getDoc(teacherDocRef);

    if (teacherDocSnap.exists()) {
      return { id: teacherDocSnap.id, ...teacherDocSnap.data() };
    }

    return null;
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};

export default getStudentById;
