import React from "react";
import UseDetails from "./useDetails";
import { Link } from "react-router-dom";

function Details() {
  const { data } = UseDetails();

  const containerStyle = {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "50px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "warp",
    boxShadow: "inset 0 0 2px 1px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "30px",
  };

  const detailsContainerStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexWrap: "wrap",
  };

  const detailItemStyle = {
    width: "300px",
    margin: "10px",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "inset 0 0 2px 1px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FBF9F1",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const imageContainerStyle = {
    marginBottom: "20px",
  };
  console.log(data);
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Details of Teacher</div>
      <div style={detailsContainerStyle}>
        <div style={imageContainerStyle}>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Profile Picture</div>
            <img
              src={data?.photoURL}
              style={{ width: "100%", borderRadius: "8px" }}
              alt="Profile"
            />
          </div>
        </div>
        <div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Name</div>
            <div>{data?.name}</div>
          </div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Last Degree</div>
            <div>{data?.lastDegree}</div>
          </div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Address</div>
            <div>{data?.address}</div>
          </div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Department</div>
            <div>{data?.department}</div>
          </div>
          {data?.charges && (
            <div style={detailItemStyle}>
              <div style={labelStyle}>Price per hour</div>
              <div>{data?.charges}</div>
            </div>
          )}
          {data?.experience && (
            <div style={detailItemStyle}>
              <div style={labelStyle}>Experience</div>
              <div>{data?.experience}</div>
            </div>
          )}
          {data?.enrolledCourses && (
            <div style={detailItemStyle}>
              <div style={labelStyle}>Enrolled Courses</div>
              <div>
                {data?.enrolledCourses?.map((item, i) => {
                  return (
                    <Link to={`/courseDetails/${item?.uid}`} key={i}>
                      {item?.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
