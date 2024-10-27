import "./course.css";
import { Coursedata } from "../../Appdata";
import CourseCard from "../CourseCard/CourseCard";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <>
      <div className="blog-container" id="blog">
        <div className="blog-head">
          <div className="blog-head-left">
            <div className="box">
              <div className="bar"></div>
              <span>Popular Topics To Learn</span>
            </div>
            <h2>
              We're here to share <span> Courses </span> from the{" "}
              <span>latest</span>
            </h2>
          </div>
          <div className="blog-head-right">
            <Link
              to={"/courses"}
              className="primary-btn discover"
              style={{ fontSize: "12px" }}
            >
              View All Courses
            </Link>
          </div>
        </div>
        <div className="blog-card-container">
          {Coursedata.slice(0, 3).map((elem, index) => {
            const {
              Heading,
              Subject,
              Img,
              CourseLink,
              UploadDate,
              Author,
              price,
            } = elem;
            return (
              <CourseCard
                key={index}
                BlogTopic={Subject}
                BlogHeading={Heading}
                BlogImg={Img}
                date={UploadDate}
                Account={Author}
                price={price}
                BlogLink={CourseLink}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Course;
