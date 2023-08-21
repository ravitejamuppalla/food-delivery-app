import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import UseInput from "../../hooks/use-Input";
import { loginToAccount } from "../../store/authStore";
import { useDispatch, useSelector } from "react-redux";
import { SucessMessageTroster } from "../../utils/UtilsFunction";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../hooks/Loader";
import { authActions } from "../../store/authStore";
function Login(props) {
  const [enableIsFormValid, setEnableFormValid] = useState(false);
  const [isLoadingLogin, setLoadingLogin] = useState(false);
  let navigate = useNavigate();

  let errorInRegistration = useSelector(
    (data) => data.authication.errorInAuthtication
  );
  let registerEmail = useSelector((data) => data.authication.currentUser);
  let dispatch = useDispatch();
  authActions.registerForCreateNewUser("");
  // dispatch(authActions.errorForCreateNewUser(""));
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
  function onsubmitHandler(event) {
    event.preventDefault();
    let loginObject = {
      email: EmailInputValue,
      password: PasswordInputValue,
    };
    dispatch(loginToAccount(loginObject));
    setLoadingLogin(true);
  }
  useEffect(() => {
    if (EmailInputValueIsValid && PasswordInputValueIsValid) {
      setEnableFormValid(true);
    } else setEnableFormValid(false);
  }, [EmailInputValueIsValid, PasswordInputValueIsValid]);

  useEffect(() => {
    if (
      registerEmail.email === EmailInputValue &&
      errorInRegistration.length == 0
    ) {
      console.log("Entering into the application");
      setLoadingLogin(false);
      SucessMessageTroster("Sucessfully Logged to Application", 1000);
      navigate("/home");
    }
  }, [registerEmail, errorInRegistration]);

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
        <form className={classes.login} onSubmit={onsubmitHandler}>
          <p className={classes.loginHeading}>Log In</p>
          {errorInRegistration.length > 0 && (
            <p className={classes.error}>
              {errorInRegistration.split("Firebase:")[1].split("(")[0]}
            </p>
          )}
          <input
            placeholder="Email"
            onChange={EmailTextInputHandler}
            value={EmailInputValue}
            onBlur={EmailTochedInputHandler}
            autoFocus
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
          <button disabled={!enableIsFormValid}>Login</button>
        </form>
        <div className={classes.navigateRegister}>
          <p>
            Want to create the New Account ?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
