import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthContext } from "../../../contexts/AuthContext";
import { message } from "antd";
const UseCourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState();
  const userRole = localStorage.getItem("user");
  const role = JSON.parse(userRole);
  const { user } = useAuthContext();
  useEffect(() => {
    try {
      const userDocRef = doc(firestore, "Courses", id);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const courseData = doc.data();
          setData(courseData);
        } else {
          setData(null);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error listening to user data:", error);
      throw new Error("An error occurred while listening to user data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleEnrollNow = async () => {
    try {
      const uid = Math.random().toString(36).slice(2);
      const courseData = data;
      if (!courseData) {
        return message.error("Course data not found !");
      }
      if (!user) {
        return message.error("Please login to enroll now!");
      }
      const applicant = user;
      const CourseEnrollmentData = {
        courseData: courseData,
        applicant: applicant,
        uid: uid,
      };
      await setDoc(doc(firestore, "Request", uid), CourseEnrollmentData);
      message.success("Request sent successfully!");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePaymentModal = async () => {
    setOpenPayment(true);
    if (!data || !user) {
      console.log("No course data or user provided.");
      return;
    }
    try {
      setLoading(true);
      const dataChecking = await getDoc(doc(firestore, "Courses", data.uid));
      const courseData = dataChecking.data();
      let updateData = {};

      const uid = Math.random().toString(36).slice(2);
      if (!courseData.students) {
        courseData.students = [];
      }
      const studentExists = courseData.students.some(
        (student) => student.uid === user.uid
      );
      if (!studentExists) {
        courseData.students.push(user);
        updateData = {
          students: courseData.students,
        };
      } else {
        message.warning("Student already exists!");
        await deleteDoc(doc(firestore, "Request", uid));
        setLoading(false);
        return;
      }
      await updateDoc(doc(firestore, "Courses", data.uid), updateData);
      const applicantDoc = await getDoc(doc(firestore, user.role, user.uid));
      const applicantData = applicantDoc.data();
      if (!applicantData.enrolledCourses) {
        applicantData.enrolledCourses = [];
      }
      applicantData.enrolledCourses.push(data);
      await updateDoc(doc(firestore, user.role, user.uid), {
        enrolledCourses: applicantData.enrolledCourses,
      });

      const chatRoomRef = doc(firestore, "ChatRooms", courseData.chatRoomUid);
      const chatRoomSnap = await getDoc(chatRoomRef);
      const chatRoomData = chatRoomSnap.data();

      let updatedMembers;
      if (chatRoomData.members && chatRoomData.members.length > 0) {
        updatedMembers = [...chatRoomData.members, user.uid];
      } else {
        updatedMembers = [user.uid];
      }

      await updateDoc(chatRoomRef, { members: updatedMembers });
      message.success("Request has been processed!");
      await deleteDoc(doc(firestore, "Request", uid));
    } catch (error) {
      console.log("error", error);
      message.error("An error occurred while processing the request.");
    } finally {
      setLoading(false);
    }
  };
  // const handlePaymentModal = async () => {
  //   setOpenPayment(true);
  //   console.log("request", request);
  //   try {
  //     const dataChecking = await getDoc(
  //       doc(firestore, "Courses", request?.courseData?.uid)
  //     );
  //     const courseData = dataChecking.data();
  //     let data = {};

  //       if (!courseData.students) {
  //         courseData.students = [];
  //       }
  //       const studentExists = courseData.students.some(
  //         (student) => student?.uid === request?.applicant?.uid
  //       );
  //       if (!studentExists) {
  //         courseData.students.push(request?.applicant);
  //         data = {
  //           students: courseData.students,
  //         };
  //       } else {
  //         message.warning("Student exists already!");
  //         await deleteDoc(doc(firestore, "Request", request?.id));
  //         setLoading(false);
  //         return;
  //       }

  //     await updateDoc(
  //       doc(firestore, "Courses", request?.courseData?.uid),
  //       data
  //     );
  //     const applicant = await getDoc(
  //       doc(firestore, request?.applicant?.role, request?.applicant?.uid)
  //     );
  //     const dataToUpdate = applicant.data();
  //     if (!dataToUpdate?.enrolledCourses) {
  //       dataToUpdate.enrolledCourses = [];
  //     }
  //     dataToUpdate?.enrolledCourses.push(request?.courseData);
  //     const applicantData = {
  //       enrolledCourses: dataToUpdate?.enrolledCourses,
  //     };
  //     await updateDoc(
  //       doc(firestore, request?.applicant?.role, request?.applicant?.uid),
  //       applicantData
  //     );
  //     const chatRoomRef = doc(firestore, "ChatRooms", courseData.chatRoomUid);
  //     const chatRoomSnap = await getDoc(chatRoomRef);
  //     const chatRoomData = chatRoomSnap.data();

  //     let updatedMembers;
  //     if (chatRoomData.members && chatRoomData.members.length > 0) {
  //       updatedMembers = [...chatRoomData.members, request?.applicant?.uid];
  //     } else {
  //       updatedMembers = [request?.applicant?.uid];
  //     }

  //     await updateDoc(chatRoomRef, { members: updatedMembers });
  //     message.success("Request has been proccessed!");
  //     await deleteDoc(doc(firestore, "Request", request?.id));
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("error", error);
  //     message.error(error.message);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlePaymentClose = () => setOpenPayment(false);

  const handleReview = async (event) => {
    event.preventDefault();
    setLoading(true);
    const id = data?.uid;
    const userDocRef = doc(firestore, "Courses", id);
    collection(userDocRef, "Reviews", review);
    try {
    } catch (error) {
      console.log("Something went wrong while adding the review.", error);
    }
  };
  return {
    data,
    open,
    role,
    loading,
    handleOpen,
    handleClose,
    handleReview,
    handleEnrollNow,
    openPayment,
    handlePaymentModal,
    handlePaymentClose,
  };
};

export default UseCourseDetails;
