import About from "../../../components/About/about";
import Course from "../../../components/Course/Course";
import Banner from "../../../components/Home/banner/banner";
import Services from "../../../components/Services/services";
import Testimonial from "../../../components/Testimonials/testimonial";
import Team from "../../../components/Team/Team";

const Main = () => {
  return (
    <>
      <Banner />
      <About />
      <Services />
      <Team />
      <Testimonial />
      <Course />
    </>
  );
};

export default Main;
