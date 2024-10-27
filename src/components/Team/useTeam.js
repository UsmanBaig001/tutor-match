import { useEffect, useState } from "react";
import getTeachersCollection from "../../hooks/TeacherHook";

const UseTeam = () => {
  const [teacherData, setTeacherData] = useState([]);

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
  return { teacherData };
};

export default UseTeam;
