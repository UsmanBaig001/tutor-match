import "../courses/courses.scss";
import { Slider, TextField } from "@mui/material";
import { useState } from "react";
import TeacherCard from "../../../components/TeacherCard/TeacherCard";
import UseTeachers from "./useTeachers";

const Teachers = () => {
  const { teacherData, handleChange, state } = UseTeachers();
  const [displayCount, setDisplayCount] = useState(4);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 4);
  };
  const filteredData = teacherData?.filter((teacher) => {
    const inputSearch = state?.search?.toLowerCase();
    const lowercasedInput = inputSearch?.toLowerCase();
    const department = teacher?.department?.toLowerCase();
    const price = parseFloat(state?.priceValue);
    const teacherCharges = parseFloat(teacher?.charges);

    const passesSearch =
      teacher?.name?.toLowerCase()?.includes(lowercasedInput) ||
      department?.includes(lowercasedInput);

    const passesPriceFilter = teacherCharges >= price;

    return passesSearch && passesPriceFilter;
  });

  const showLoadMoreButton = teacherData?.length > displayCount;

  return (
    <>
      <section className="courses-page">
        <div className="search">
          <TextField
            id="outlined-basic"
            label="Search Instructors"
            variant="outlined"
            name="search"
            style={{ width: "70%", background: "#fff" }}
            type="text"
            value={state?.search}
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
          Filter by Per Hour Cost
        </div>
        <div style={{ maxWidth: "670px", margin: "auto " }}>
          <Slider
            style={{ color: "var(--red)" }}
            aria-label="Price Range"
            defaultValue={250}
            name="priceValue"
            onChange={handleChange}
            valueLabelDisplay="auto"
            shiftStep={30}
            marks
            step={250}
            min={250}
            max={10000}
          />
        </div>

        {/* ----------------- Teacher Cards --------------------- */}

        <div className="course-card-container">
          {filteredData?.slice(0, displayCount)?.map((elem, index) => {
            const { name, photoURL, department, id, charges } = elem;
            if (!name || !charges || !department) {
              return;
            }
            return (
              <TeacherCard
                id={id}
                key={index}
                name={name}
                charges={charges}
                Twitter={""}
                Facebook={""}
                LinkedIn={""}
                subject={department}
                teacherImg={photoURL}
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
export default Teachers;
