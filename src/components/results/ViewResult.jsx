// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from "../../config/firebase";

// const ViewResults = (props) => {
//   const [results, setResults] = useState([]);
//   console.log("props", props.students);
//   useEffect(() => {
//     const fetchResults = async () => {
//       const resultsRef = collection(firestore, "Results");
//       const snapshot = await getDocs(resultsRef);
//       const resultsData = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id, // Add the document ID to the data
//       }));
//       setResults(resultsData);
//     };
//     fetchResults();
//   }, []);

//   console.log("results", results);

//   const columns = [
//     {
//       title: "No.",
//       key: "index",
//       render: (text, record, index) => index + 1, // Row numbering
//     },
//     {
//       title: "Student Name",
//       dataIndex: ["studentData", "name"], // Access nested student name
//       key: "name",
//     },
//     { title: "Semester", dataIndex: "semester", key: "semester" },
//     { title: "Math", dataIndex: "math", key: "math" },
//     { title: "Science", dataIndex: "science", key: "science" },
//     { title: "English", dataIndex: "english", key: "english" },
//     { title: "History", dataIndex: "history", key: "history" },
//   ];

//   return (
//     <Table
//       dataSource={results}
//       columns={columns}
//       rowKey={(record) => `${record.id}-${record.semester}`} // Ensure unique row keys
//     />
//   );
// };

// export default ViewResults;
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase";

const ViewResults = (props) => {
  const [results, setResults] = useState([]);
  const studentIds = props?.students?.map((student) => student?.uid); // Extract student IDs from props

  useEffect(() => {
    const fetchResults = async () => {
      const resultsRef = collection(firestore, "Results");
      const snapshot = await getDocs(resultsRef);
      const resultsData = snapshot?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Add the document ID to the data
      }));

      // Filter results to include only those whose studentData.uid is in studentIds
      const filteredResults = resultsData?.filter((result) =>
        studentIds?.includes(result?.studentData?.uid)
      );

      setResults(filteredResults);
    };
    fetchResults();
  }, [studentIds]); // Dependency array includes studentIds

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1, // Row numbering
    },
    {
      title: "Student Name",
      dataIndex: ["studentData", "name"], // Access nested student name
      key: "name",
    },
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "Math", dataIndex: "math", key: "math" },
    { title: "Science", dataIndex: "science", key: "science" },
    { title: "English", dataIndex: "english", key: "english" },
    { title: "History", dataIndex: "history", key: "history" },
  ];

  return (
    <Table
      dataSource={results}
      columns={columns}
      rowKey={(record) => `${record?.id}-${record?.semester}`} // Ensure unique row keys
    />
  );
};

export default ViewResults;
