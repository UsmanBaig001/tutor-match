import AccImg from "../../assets/Blog2.png";
import DateImg from "../../assets/Blog1.png";
import { Link } from "react-router-dom";

export default function CourseCard(props) {
  return (
    <>
      <div className="blog-card">
        <div className="blog-topic">{props.BlogTopic}</div>
        <img src={props.BlogImg} alt="" />
        <div className="date">
          <img src={DateImg} alt="" />
          <span>{props.date}</span>
        </div>
        <div className="blog-heading">
          <h3>{props.BlogHeading}</h3>
        </div>
        <div>
          <p
            style={{
              padding: "10px 0 0 12px",
              color: "tomato",
              textTransform: "capitalize",
            }}
          >
            Course Charges: &nbsp; {props.price}
          </p>
        </div>
        <div className="blog-card-footer">
          <div className="publisher">
            <img src={AccImg} alt="" />
            <span>{props.Account}</span>
          </div>
          <div className="read-more">
            <Link to={props.BlogLink}>
              Read More <span>+</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
