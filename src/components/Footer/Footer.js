import React from "react";
import classes from "./Footer.module.css";

import logo from "../../assets/images/res-logo.png";
import { BiSolidSend } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";

function Footer(props) {
  return (
    <div className={classes.footer}>
      <div className={classes.footer_Section}>
        <div className={`${classes["main-footer"]}`}>
          <div className={`${classes["logofooter"]}`}>
            <img src={logo} alt="Res log"></img>
            <span>Tasty Treat</span>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
            </p>
          </div>
          <div className={classes.develiryTime}>
            <p>Delivery Time</p>
            <div>
              <span className={classes.days}>Sunday-Thursday</span>
              <span className={classes.times}>10:00am-11:00pm</span>
            </div>
            <div>
              <span className={classes.days}>Friday-Saturday</span>
              <span className={classes.times}>Off Day</span>
            </div>
          </div>
          <div className={classes.contact}>
            <p>Contact</p>
            <div className={classes.contactDetails}>
              <span>Location:6-86k,Sunshine men's PG,Hyderabad,500032</span>
              <span className={classes.contactphoneNumber}>
                Phone:+91-8333874701
              </span>
              <span className={classes.contactEmail}>
                Email:ravitejamuppalla5120@gmail.com
              </span>
            </div>
          </div>
          <div className={classes.newsletter}>
            <p>Newsletter</p>
            <span>Subscribe our Newsletter</span>
            <div className={`${classes["input-icons"]}`}>
              <input
                className={`${classes["input-field"]}`}
                type="text"
                placeholder="Enter your Email"
              ></input>
              <AiOutlineSend
                className={classes.sendEmailButton}
              ></AiOutlineSend>
              {/* <BiSolidSend className={classes.icon}></BiSolidSend> */}
            </div>
          </div>
        </div>
        <div className={classes.copyrights}>
          <p>
            Copyright 2023 website made by Ravi Teja Muppalla. All Right
            Reserved
          </p>
          <div>
            <span>Follow:</span>
            <ion-icon name="logo-facebook"></ion-icon>
            <ion-icon name="logo-github"></ion-icon>
            <ion-icon name="logo-youtube"></ion-icon>
            <ion-icon name="logo-linkedin"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
