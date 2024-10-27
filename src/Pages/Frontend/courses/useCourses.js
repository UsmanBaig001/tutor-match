import { useEffect, useState } from "react";
import getCoursesCollection from "../../../hooks/CoursesHook";
const UseCourses = () => {
  const [courseData, setCourseData] = useState([]);
  const [state, setState] = useState({ priceValue: "250", search: "" });

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getCoursesCollection();
        setCourseData(courses);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchData();
  }, []);

  return { courseData, handleChange, state };
};

export default UseCourses;
