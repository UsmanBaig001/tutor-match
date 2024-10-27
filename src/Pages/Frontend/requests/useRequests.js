import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { message } from "antd";

const UseRequests = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "Request"),
      (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(documents);
      }
    );
    return () => unsubscribe();
  }, []);
  const handleAccept = async (request) => {
    setLoading(true);
    console.log("request", request);
    try {
      const dataChecking = await getDoc(
        doc(firestore, "Courses", request?.courseData?.uid)
      );
      const courseData = dataChecking.data();
      let data = {};
      if (request.applicant.role === "Teacher") {
        const teacherExists =
          courseData?.teacher &&
          courseData?.teacher?.uid === request?.applicant?.uid;
        if (!teacherExists) {
          data = {
            teacher: request?.applicant,
          };
        } else {
          message.warning("Teacher exists already!");
          await deleteDoc(doc(firestore, "Request", request?.id));
          setLoading(false);
          return;
        }
      } else {
        if (!courseData.students) {
          courseData.students = [];
        }
        const studentExists = courseData.students.some(
          (student) => student?.uid === request?.applicant?.uid
        );
        if (!studentExists) {
          courseData.students.push(request?.applicant);
          data = {
            students: courseData.students,
          };
        } else {
          message.warning("Student exists already!");
          await deleteDoc(doc(firestore, "Request", request?.id));
          setLoading(false);
          return;
        }
      }
      await updateDoc(
        doc(firestore, "Courses", request?.courseData?.uid),
        data
      );
      const applicant = await getDoc(
        doc(firestore, request?.applicant?.role, request?.applicant?.uid)
      );
      const dataToUpdate = applicant.data();
      if (!dataToUpdate?.enrolledCourses) {
        dataToUpdate.enrolledCourses = [];
      }
      dataToUpdate?.enrolledCourses.push(request?.courseData);
      const applicantData = {
        enrolledCourses: dataToUpdate?.enrolledCourses,
      };
      await updateDoc(
        doc(firestore, request?.applicant?.role, request?.applicant?.uid),
        applicantData
      );
      const chatRoomRef = doc(firestore, "ChatRooms", courseData.chatRoomUid);
      const chatRoomSnap = await getDoc(chatRoomRef);
      const chatRoomData = chatRoomSnap.data();

      let updatedMembers;
      if (chatRoomData.members && chatRoomData.members.length > 0) {
        updatedMembers = [...chatRoomData.members, request?.applicant?.uid];
      } else {
        updatedMembers = [request?.applicant?.uid];
      }

      await updateDoc(chatRoomRef, { members: updatedMembers });
      message.success("Request has been proccessed!");
      await deleteDoc(doc(firestore, "Request", request?.id));
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      message.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId) => {
    await deleteDoc(doc(firestore, "Request", requestId));
    message.success("Request rejected successfully!");
  };
  return { requests, handleAccept, handleReject, loading };
};

export default UseRequests;
