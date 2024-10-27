import { useEffect, useState } from "react";
import getTeachersCollection from "../../../hooks/TeacherHook";

const UseTeachers = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [state, setState] = useState({ priceValue: "250", search: "" });
  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachers = await getTeachersCollection();
        setTeacherData(teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchData();
  }, []);
  return { teacherData, handleChange, state };
};

export default UseTeachers;
