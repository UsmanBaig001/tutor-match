import "./courses.scss";
import { Slider, TextField } from "@mui/material";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { useState } from "react";
import useCourses from "./useCourses";
import ReviewModal from "../../../components/ReviewModal/ReviewModal";

const Courses = () => {
  const { courseData, handleChange, state } = useCourses();
  const [displayCount, setDisplayCount] = useState(6);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 6);
  };

  const filteredData = courseData.filter((elem) => {
    const inputValue = state.search;
    const lowercasedInput = inputValue.toLowerCase();
    const price = parseFloat(state?.priceValue);
    const passesSearch = elem.name.toLowerCase().includes(lowercasedInput);
    const passesPriceFilter = parseFloat(elem.price) >= price;
    return passesSearch && passesPriceFilter;
  });

  const showLoadMoreButton = courseData.length > displayCount;

  return (
    <>
      <section className="courses-page">
        <div className="search">
          <TextField
            id="outlined-basic"
            label="Search Courses"
            variant="outlined"
            style={{ width: "70%", background: "#fff" }}
            type="text"
            name="search"
            value={state.search}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          Filter By Course Price{" "}
        </div>
        <div style={{ maxWidth: "670px", margin: "auto " }}>
          <Slider
            color="secondary"
            aria-label="Price Range"
            defaultValue={250}
            name="priceValue"
            onChange={handleChange}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={250}
            marks
            min={250}
            max={10000}
          />
        </div>

        {/* ------------------ Courses ------------------ */}

        <div className="course-card-container">
          {filteredData.slice(0, displayCount).map((elem, index) => {
            return (
              <CourseCard
                key={index}
                BlogTopic={elem.name}
                BlogHeading={elem.description.slice(0, 44) + "..."}
                BlogImg={elem.photoURL}
                date={elem.date}
                Account={"Admin"}
                price={elem.price}
                BlogLink={`/courseDetails/${elem.id}`}
              />
            );
          })}
        </div>

        <div className="search">
          {showLoadMoreButton && (
            <button className="primary-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
