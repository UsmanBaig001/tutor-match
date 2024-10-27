import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getStudentsCollection } from "../../../hooks/StudentsHook";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
const UseCourseDash = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const item = location.state?.item;
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, "Student");
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredStudents = documents.filter((student) =>
          item?.students?.includes(student.id)
        );
        setStudentsData(filteredStudents);
      } catch (error) {
        console.log("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item?.students]);

  const columns = [
    {
      title: "Profile Pic",
      dataIndex: "photoURL",
      key: "photoURL",
      render: (photoURL) => (
        <img
          src={photoURL}
          alt="Student"
          style={{ width: 50, height: 50, borderRadius: "25px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Last Degree",
      dataIndex: "lastDegree",
      key: "lastDegree",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  return {
    handleListItemClick,
    toggleDrawer,
    columns,
    loading,
    studentsData,
    selectedIndex,
    open,
    item,
  };
};

export default UseCourseDash;
