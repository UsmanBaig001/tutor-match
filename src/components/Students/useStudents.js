import { useEffect, useState } from "react";
import getStudentsCollection from "../../hooks/StudentsHook";

const UseStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getStudentsCollection();
        setStudentsData(students);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchData();
  }, []);
  const filteredStudents = studentsData.filter(
    (student) => student.name.trim() !== ""
  );
  const dataSource = filteredStudents;
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
  return { dataSource, columns };
};

export default UseStudents;
