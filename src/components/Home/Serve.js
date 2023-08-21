import React, { Fragment } from "react";
import classes from "./Serve.module.css";
import servicecompImg1 from "../../assets/images/service-01.png";
import servicecompImg2 from "../../assets/images/service-02.png";
import servicecompImg3 from "../../assets/images/service-03.png";

function Serve(props) {
  return (
    <Fragment>
      <div className={classes.mainServer}>
        <section className={classes.serveContainer}>
          <div className={classes.container}>
            <p className={classes.heading1}>What we Serve</p>
            <p className={classes.heading2}>
              Just sit back at home we will{" "}
              <span className={classes.colorchange}>take care</span>
            </p>
            <p className={classes.heading3}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
              sit dolorem non commodi dignissimos veritatis vel nemo cupiditate
              sint
            </p>
          </div>
        </section>
        <section className={classes.serviceOuterContainer}>
          <div className={classes.serviceRowContiner}>
            <div className={classes.serviceItem}>
              <img src={servicecompImg1}></img>
              <p>Quick Delivery</p>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quidem facere mollitia obcaecati
              </span>
            </div>
            <div className={classes.serviceItem}>
              <img src={servicecompImg2}></img>
              <p>Super Dine In</p>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quidem facere mollitia obcaecati
              </span>
            </div>
            <div className={classes.serviceItem}>
              <img src={servicecompImg3}></img>
              <p>Easy Pick Up</p>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quidem facere mollitia obcaecati
              </span>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default Serve;
