import React from "react";
import UseStudents from "./useStudents";
import { Table } from "antd";

function StudentsTable() {
  const { dataSource, columns } = UseStudents();
  return (
    <>
      <div className="table" style={{ margin: "40px 20px" }}>
        <h1
          style={{
            color: "tomato",
            textAlign: "center",
            margin: "20px",
            fontWeight: "400",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          List of all Students
        </h1>
        <div style={{ overflow: "auto" }}>
          <Table dataSource={dataSource} columns={columns} rowKey="id" />
        </div>
      </div>
    </>
  );
}

export default StudentsTable;
