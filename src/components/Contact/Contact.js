import React, { Fragment, useRef } from "react";
import classes from "./Contact.module.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import { SucessMessageTroster } from "../../utils/UtilsFunction";

function Contact(props) {
  let nameInput = useRef();
  let emailInput = useRef();
  let commentsInput = useRef();

  function submitContactHandler(event) {
    event.preventDefault();
    SucessMessageTroster("Message Sent Sucessfully", 1000);
    nameInput.current.value = "";
    emailInput.current.value = "";
    commentsInput.current.value = "";
  }

  return (
    <Fragment>
      <section className={classes.contactSection}>
        <div className={classes.container}>
          <h1>Get In Touch</h1>
          <div className={classes.contactDetails}>
            <div className={classes.eachSectionContainer}>
              <HiOutlineLocationMarker
                className={classes.iconMarker}
              ></HiOutlineLocationMarker>

              <p>Address</p>

              <div className={classes.AdressDetails}>
                <h3>
                  5th Floor, B-2-293/82/A/58/A, Road No.8, Pavani Equinox,
                  Jubilee Hills, Hyderabad, 500033
                </h3>
                <h3>
                  GAR Laxmi, BNR Colony, BN Reddy Colony, Banjara Hills,
                  Hyderabad, Telangana 500034
                </h3>
                <h3>
                  Tolichowki Rd, Salarjung Colony, Kakatiya Nagar, Toli Chowki,
                  Hyderabad, Telangana 500008
                </h3>
              </div>
            </div>
            <div className={classes.eachSectionContainer}>
              <HiOutlinePhone className={classes.iconMarker}></HiOutlinePhone>
              <p>Phone</p>
              <div className={classes.AdressDetails}>
                <h3>+91 226 232 7777 India phone</h3>
                <h3>+6 138 658 3448 USA Phone</h3>
                <h3>+91 113 310 7581 Russia phone</h3>
              </div>
            </div>
            <div className={classes.eachSectionContainer}>
              <HiOutlineMail className={classes.iconMarker}></HiOutlineMail>
              <p>Email</p>
              <div className={classes.AdressDetails}>
                <h3>Request for Proposal zomato@gmail.com</h3>
                <h3>All Bid Opportunities ravitejaMuppalla@gmail.com</h3>
                <h3>Electrical Service Calls ravitejamuppalla5120@gmail.com</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={classes.section2}>
        <div className={classes.messageUsData}>
          <h1>Message Us</h1>
          <p>
            Help is available when you need it, 24 hours a day, 7 days a week.
            Explore ways to get the answers you need and contact Uber for
            assistance.
          </p>
        </div>
        <div className={classes.messagesForm}>
          <div className={classes.reviewInputs}>
            <input placeholder="Enter Your Name" ref={nameInput}></input>
            <input placeholder="Enter Your Email" ref={emailInput}></input>
            <textarea
              placeholder="Please Enter comments"
              ref={commentsInput}
            ></textarea>
            <button onClick={submitContactHandler}>Submit</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Fragment>
  );
}

export default Contact;
