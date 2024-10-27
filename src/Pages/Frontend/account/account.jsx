import "./account.scss";
import BannerImg from "../../../assets/Backgrounds/bg_Bottom.png";
import { Button, CircularProgress, LinearProgress } from "@mui/material";
import BasicModal from "../../../components/Modal/Modal";
import useAccount from "./useAccount";
import { Link } from "react-router-dom";
const Account = () => {
  const {
    open,
    data,
    file,
    setFile,
    loading,
    photoURL,
    progress,
    handleOpen,
    handleFile,
    handleClose,
  } = useAccount();
  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={74} />
      </div>
    );
  } else
    return (
      <>
        <section className="account-container">
          <BasicModal open={open} data={data} close={handleClose} />
          <div className="img-section">
            <img src={BannerImg} alt="Banner Image" height={"100%"} />
          </div>
          <div className="main-content">
            <div className="profile-img">
              {!photoURL ? (
                <img src={data.photoURL} alt="Profile photo" height={"100%"} />
              ) : (
                <img src={photoURL} alt="Profile photo" height={"100%"} />
              )}
            </div>
            <h1>{data?.name}</h1>
          </div>
          <div className="profile-details">
            {data?.lastDegree && (
              <div className="bio">
                <h2>{data?.role}'s Credential</h2>
                <div className="education-designation">
                  <i className="fa-solid fa-briefcase"></i>
                  <span>
                    Senior Frontend Developer ReactJs, ReactNative at Rankviz
                  </span>
                </div>
                <div className="education-designation">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span>{data?.lastDegree}</span>
                </div>
                {data?.enrolledCourses && (
                  <div className="education-designation">
                    <i className="fa-solid fa-graduation-cap"></i>
                    <span>
                      {data?.enrolledCourses.map((item, i) => {
                        return (
                          <div className="" key={i}>
                            <Link
                              to={`/courseDetails/${item.uid}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.name}
                            </Link>
                            <Link
                              to={`/courseDash`}
                              state={{
                                item: item,
                              }}
                            >
                              Chat Room
                            </Link>
                          </div>
                        );
                      })}
                    </span>
                  </div>
                )}
                <div
                  className="education-designation"
                  style={{ marginLeft: "3px" }}
                >
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  <span style={{ marginLeft: "3px" }}>{data?.address}</span>
                </div>
                {data?.role === "Student" && (
                  <>
                    <div
                      className="education-designation"
                      style={{ marginLeft: "3px" }}
                    >
                      <i className="fa-sharp fa-solid fa-location"></i>
                      <span style={{ marginLeft: "3px" }}>{data?.city}</span>
                    </div>
                  </>
                )}
                {data?.role === "Teacher" && (
                  <>
                    <div
                      className="education-designation"
                      style={{ marginLeft: "2px" }}
                    >
                      <i className="fa-sharp fa-solid fa-book"></i>
                      <span>{data?.department}</span>
                    </div>
                    <div
                      className="education-designation"
                      style={{ marginLeft: "4px" }}
                    >
                      <i className="fa-sharp fa-solid fa-dollar"></i>
                      <span style={{ marginLeft: "4px" }}>
                        {data?.charges} / hr{" "}
                      </span>
                    </div>
                    <div
                      className="education-designation"
                      style={{ marginLeft: "0px" }}
                    >
                      <i className="fa-sharp fa-solid fa-clock"></i>
                      <span style={{ marginLeft: "2px" }}>
                        {data?.experience}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
            <div className="">
              <div className="posts">
                <Button className="updateInfo" onClick={handleOpen}>
                  <i className="fa-solid fa-edit"></i>
                </Button>
                <h2>Profile</h2>
                <input
                  type="file"
                  placeholder="Upload picture"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                {file && typeof file === "object" && (
                  <img
                    src={URL.createObjectURL(file)}
                    style={{ width: 100, height: 70 }}
                    alt="Uploaded Profile"
                  />
                )}
                {progress > "0" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={34} />
                    {progress > "0" && (
                      <div
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          marginLeft: "10px",
                        }}
                      >
                        {progress}%
                      </div>
                    )}
                  </div>
                )}
                <Button variant="outlined" onClick={() => handleFile()}>
                  Change Profile
                </Button>
              </div>
              <div className="management">
                <h2>Account Managment</h2>
                <Button variant="outlined" color="error">
                  <Link
                    to={"/changePassword"}
                    style={{
                      color: "tomato",
                      // fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    Change Password
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default Account;
