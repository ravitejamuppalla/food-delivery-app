import React, { Fragment } from "react";
import "./Testimonial.css";
import neworkImg from "../../assets/images/network.png";
import Slider from "react-slick";
import reviwer1 from "../../assets/images/ava-1.jpg";
import reviwer2 from "../../assets/images/ava-2.jpg";
import reviwer3 from "../../assets/images/ava-3.jpg";
import reviwer4 from "../../assets/images/ava-4.jpg";

function Testimonial(props) {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Fragment>
      <section className="testimonialSection">
        <div className="container">
          <div className="ContenetDetailsForTest">
            <p>Testimonial</p>
            <h1>
              What our <span>customers</span> are saying
            </h1>
            <span>
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem illo cumque maiores illum rerum animi ea quos quasi
              itaque, omnis et voluptate voluptas maxime sapiente porro ullam
              provident molestias quisquam?"
            </span>
            <Slider {...settings}>
              <div className="Review_Text">
                <h5>
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat quaerat, doloribus eligendi ipsum ex nihil ipsam
                  ducimus suscipit deleniti? Molestiae rem cum cumque incidunt
                  aspernatur quas sunt accusamus blanditiis error?"
                </h5>
                <div className="reviewer_Details">
                  <img src={reviwer1}></img>
                  <p>Charles</p>
                </div>
              </div>
              <div className="Review_Text">
                <h5>
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat quaerat, doloribus eligendi ipsum ex nihil ipsam
                  ducimus suscipit deleniti? Molestiae rem cum cumque incidunt
                  aspernatur quas sunt accusamus blanditiis error?"
                </h5>
                <div className="reviewer_Details">
                  <img src={reviwer2}></img>
                  <p>Olivia</p>
                </div>
              </div>
              <div className="Review_Text">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat quaerat, doloribus eligendi ipsum ex nihil ipsam
                  ducimus suscipit deleniti? Molestiae rem cum cumque incidunt
                  aspernatur quas sunt accusamus blanditiis error?
                </h5>
                <div className="reviewer_Details">
                  <img src={reviwer3}></img>
                  <p>Donald</p>
                </div>
              </div>
              <div className="Review_Text">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat quaerat, doloribus eligendi ipsum ex nihil ipsam
                  ducimus suscipit deleniti? Molestiae rem cum cumque incidunt
                  aspernatur quas sunt accusamus blanditiis error?
                </h5>
                <div className="reviewer_Details">
                  <img src={reviwer4}></img>
                  <p>Patricia</p>
                </div>
              </div>
            </Slider>
          </div>
          <img src={neworkImg} alt="Newwork Img"></img>
        </div>
      </section>
    </Fragment>
  );
}

export default Testimonial;
