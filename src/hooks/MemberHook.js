import { firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const getMember = async (id) => {
  try {
    const studentDoc = await getDoc(doc(firestore, "Students", id));
    const teacherDoc = await getDoc(doc(firestore, "Teachers", id));

    const studentData = studentDoc.exists() ? studentDoc.data() : {};
    const teacherData = teacherDoc.exists() ? teacherDoc.data() : {};

    return { ...studentData, ...teacherData };
  } catch (error) {
    console.error("Error fetching member data: ", error);
    return null;
  }
};

export default getMember;
