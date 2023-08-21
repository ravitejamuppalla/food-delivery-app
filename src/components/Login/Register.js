import React, { useEffect, useRef, useState } from "react";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../Auth/Firsebase";
import UseInput from "../../hooks/use-Input";
import { useDispatch, useSelector } from "react-redux";
import { registerNewAccount } from "../../store/authStore";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  SucessMessageTroster,
  ErrorMessageTroster,
} from "../../utils/UtilsFunction";
import Loader from "../../hooks/Loader";
import { authActions } from "../../store/authStore";

function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingLogin, setLoadingLogin] = useState(false);

  let registerEmail = useSelector((data) => data.authication.currentUser);
  let errorInRegistration = useSelector(
    (data) => data.authication.registerInAuthtication
  );
  dispatch(authActions.errorForCreateNewUser(""));

  const [formIsValid, setFormIsValid] = useState();
  let {
    inputValue: FirstNameInputValue,
    inputValueIsValid: FirstNameInputValueIsValid,
    textInputHandler: FirstNameTextInputHandler,
    tochedInputHandler: FirstNameTochedInputHandler,
    isInputHasError: FirstNameIsTochedHasError,
    reset: FirstNameReset,
  } = UseInput((value) => value.trim().length > 5);
  let {
    inputValue: PhoneNumberInputValue,
    inputValueIsValid: PhoneNumberInputValueIsValid,
    textInputHandler: PhoneNumberTextInputHandler,
    tochedInputHandler: PhoneNumberTochedInputHandler,
    isInputHasError: PhoneNumberIsTochedHasError,
    reset: PhoneNumberReset,
  } = UseInput((value) => value.trim().length > 9);
  let {
    inputValue: EmailInputValue,
    inputValueIsValid: EmailInputValueIsValid,
    textInputHandler: EmailTextInputHandler,
    tochedInputHandler: EmailTochedInputHandler,
    isInputHasError: EmailIsTochedHasError,
    reset: EmailReset,
  } = UseInput((value) => value.includes("@gmail.com"));
  let {
    inputValue: PasswordInputValue,
    inputValueIsValid: PasswordInputValueIsValid,
    textInputHandler: PasswordTextInputHandler,
    tochedInputHandler: PasswordTochedInputHandler,
    isInputHasError: PasswordIsTochedHasError,
    reset: PasswordReset,
  } = UseInput((value) => value.trim().length >= 6);
  let {
    inputValue: ReEnterPasswordInputValue,
    inputValueIsValid: ReEnterPasswordInputValueIsValid,
    textInputHandler: ReEnterPasswordTextInputHandler,
    tochedInputHandler: ReEnterPasswordTochedInputHandler,
    isInputHasError: ReEnterPasswordIsTochedHasError,
    reset: ReEnterPasswordReset,
  } = UseInput((value) => value === PasswordInputValue);

  useEffect(() => {
    if (
      FirstNameInputValueIsValid &&
      EmailInputValueIsValid &&
      PasswordInputValueIsValid &&
      ReEnterPasswordInputValueIsValid
    )
      setFormIsValid(true);
    else setFormIsValid(false);
  }, [
    FirstNameInputValueIsValid,
    EmailInputValueIsValid,
    ReEnterPasswordInputValueIsValid,
  ]);

  function onsubmitRegistaionHandler(event) {
    event.preventDefault();
    let registertionObject = {
      name: FirstNameInputValue,
      email: EmailInputValue,
      password: PasswordInputValue,
    };

    dispatch(registerNewAccount(registertionObject));
    setLoadingLogin(true);
  }
  useEffect(() => {
    if (registerEmail.email === EmailInputValue) {
      SucessMessageTroster("Sucessfully Logged to Application", 1000);
      setLoadingLogin(false);
      navigate("/home");
      FirstNameReset();
      PhoneNumberReset();
      EmailReset();
      PasswordReset();
      ReEnterPasswordReset();
    }
  }, [registerEmail]);

  return (
    <div>
      {isLoadingLogin && !errorInRegistration && (
        <div className={classes.model}>
          <div className={classes.modelOverlay}>
            <div className={classes.loaderCenter}>
              <Loader></Loader>
            </div>
          </div>
        </div>
      )}
      <div className={classes.cartSection}></div>
      <div className={classes.loginSection}>
        <form className={classes.login} onSubmit={onsubmitRegistaionHandler}>
          <p className={classes.signUpHeading}>Sign Up</p>
          {errorInRegistration.length > 0 && (
            <p className={classes.error}>
              {errorInRegistration.split("Firebase:")[1].split("(")[0]}
            </p>
          )}
          <input
            placeholder="First Name"
            onChange={FirstNameTextInputHandler}
            value={FirstNameInputValue}
            onBlur={FirstNameTochedInputHandler}
            autoFocus
          ></input>
          <span className={classes.errorHandling}>
            {FirstNameIsTochedHasError && "Please Enter a Valid First Name"}
          </span>
          {/* <input
            placeholder="Phone Number"
            type="number"
            onChange={PhoneNumberTextInputHandler}
            value={PhoneNumberInputValue}
            onBlur={PhoneNumberTochedInputHandler}
          ></input>
          <span className={classes.errorHandling}>
            {PhoneNumberIsTochedHasError && "Please Enter a Valid phone number"}
          </span> */}
          <input
            placeholder="Email/MobileNumber"
            onChange={EmailTextInputHandler}
            value={EmailInputValue}
            onBlur={EmailTochedInputHandler}
          ></input>
          <span className={classes.errorHandling}>
            {EmailIsTochedHasError && "Please Entered Valid Email"}
          </span>
          <input
            placeholder="Password"
            onChange={PasswordTextInputHandler}
            value={PasswordInputValue}
            onBlur={PasswordTochedInputHandler}
          ></input>
          <span className={classes.errorHandling}>
            {PasswordIsTochedHasError && "Please Entered Valid Password"}
          </span>
          <input
            placeholder="Re-entered Password"
            onChange={ReEnterPasswordTextInputHandler}
            value={ReEnterPasswordInputValue}
            onBlur={ReEnterPasswordTochedInputHandler}
          ></input>
          <span className={classes.errorHandling}>
            {ReEnterPasswordIsTochedHasError && "please Enter Valid Password"}
          </span>
          <button className={classes.classesSignUp} disabled={!formIsValid}>
            Sign Up
          </button>
        </form>
        <div className={classes.navigateRegister}>
          <p>
            Already have an account ? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
