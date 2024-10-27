import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const TeacherCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="teacherCard">
        <div className="cardImg">
          <img src={props.teacherImg}  height={"100%"} />
        </div>
        <div>
          <h1>{props.name}</h1>
          <p>{props.subject}</p>
        </div>
        <div>
          <h5 style={{color: 'var(--red)'}}>Pricing: {props.charges}/hr</h5>
        </div>
        <div className="icons">
          <Link to={props.Facebook} className="link">
            <div className="ico">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
          </Link>
          <Link to={props.Linkedin} className="link">
            <div className="ico">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
          </Link>
          <Link to={props.Twitter} className="link">
            <div className="ico">
              <i className="fa-brands fa-twitter"></i>
            </div>
          </Link>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/details/${props.id}`);
          }}
          style={{
            border: "1px solid var(--red)",
            color: "var(--red)",
            width: "100px",
            margin: "20px 0",
          }}
        >
          Visit
        </Button>
      </div>
    </>
  );
};
export default TeacherCard;
