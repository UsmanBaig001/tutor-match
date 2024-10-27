
import "./banner.css";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <div className="banner" id="home">
        <div className="banner-heading">
          <h1>
            Education For  <span>The Future</span>
          </h1>
          <div className="para">
            <p>It Is Long Established Fact That Reader Distracted By The Readable Content.</p>
          </div>
          <Link to={'/courses'} className="primary-btn discover">Discover</Link>
        </div>
      </div>
    </>
  );
};
export default Banner;
