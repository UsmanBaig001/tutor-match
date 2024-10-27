import "./team.css";
import TeacherCard from "../TeacherCard/TeacherCard";
import UseTeam from "./useTeam";

const Case = () => {
  const { teacherData } = UseTeam();
  return (
    <>
      <div className="case">
        <div className="case-top">
          <div className="bar"></div>
          <span>TEAM MEMBERS</span>
          <div className="bar"></div>
        </div>
        <div className="case-heading">
          <h2>
            Our Expert <span>Instructors</span>
          </h2>
        </div>
        <div className="case-card-continer">
          {teacherData &&
            teacherData?.slice(0, 4).map((elem, index) => {
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
      </div>
    </>
  );
};
export default Case;
