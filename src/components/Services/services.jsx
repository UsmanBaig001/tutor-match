import React from "react";
import "./services.css";
import { ServiceCards } from "../../Appdata";

function Card(props) {
  return (
    <>
      <div className="card">
        <img src={props.img} alt="" />
        <h4>{props.heading}</h4>
        <div className="barz">
          <div className="bar-left"></div>
          <div className="bar-right"></div>
        </div>
        <p>{props.para}</p>
        <button className="card-btn" href={props.CardLink}>
          Read More ➤
        </button>
      </div>
    </>
  );
}

const Services = () => {
  return (
    <>
      <div className="services" id="services">
        <div
          className="serv-top"
          style={{
            display: "flex",
            width: "full",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div className="bar"></div>
          </div>
          <h2>Trending Subjects</h2>
          <p>Check out most searched subjects.</p>
        </div>
        <div className="card-container">
          {ServiceCards.map((elem, index) => {
            return (
              <Card
                key={index}
                CardLink={elem.CardLink}
                img={elem.img}
                heading={elem.heading}
                para={elem.CardPara}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Services;
