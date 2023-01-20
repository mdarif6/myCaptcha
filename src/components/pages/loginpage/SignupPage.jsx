import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/theme-context";
import { getFontColor } from "../../../utility/utility";
import "./SignupPage.css";

export default function SignupPage() {
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { theme, setTheme } = useTheme();
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()";

  const getCaptcha = (length) => {
    let captchaResult = "";
    for (let i = 0; i <= length; i++) {
      let randomNumber = Math.floor(Math.random() * characters.length);
      let randomCharactersFromOrginalString = characters.charAt(randomNumber);
      captchaResult += randomCharactersFromOrginalString;
    }
    return captchaResult;
  };

  useEffect(() => {
    setGeneratedCaptcha(getCaptcha(5));
  }, []);

  function formSubmitHandler(e) {
    e.preventDefault();
    if (inputCaptcha === generatedCaptcha) {
      setAlertMessage("Validated");
      setIsValid(true);
    } else {
      setGeneratedCaptcha(getCaptcha(5));
      setAlertMessage("Wrong Captcha");
      setIsValid(false);
    }
  }

  const toggleHandler = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="captcha-wrapper">
      <div
        className="captcha-toggle-heading-and-btn"
        style={{ color: getFontColor(theme) }}
      >
        <div className="captcha-toggle-heading">Appearance</div>
        <div className="captcha-toggle-btn">
          {theme === "light" ? (
            <i className="fas fa-moon" onClick={toggleHandler}></i>
          ) : (
            <i className="fas fa-sun" onClick={toggleHandler}></i>
          )}
        </div>
      </div>

      <div
        className="captcha-login-window"
        style={{
          backgroundColor: theme === "light" ? "white" : "black",
          color: getFontColor(theme),
        }}
      >
        <div className="captcha-heading">Sign Up</div>
        <form
          className="captcha-inputs"
          action="inputs"
          onSubmit={formSubmitHandler}
        >
          <div className="captcha-input">
            <div className="flipcart-input-label">Username</div>
            <input type="text" placeholder="Type your username" required />
          </div>
          <div className="captcha-input">
            <div className="flipcart-input-label">Password</div>
            <input type="password" placeholder="Type your password" required />
          </div>

          <div className="captcha-input">
            <div className="flipcart-input-label">Captcha</div>
            <input
              type="text"
              placeholder="Type captcha"
              required
              onChange={(e) => setInputCaptcha(e.target.value)}
            />
          </div>

          <div className="captcha-input  generated-captcha">
            {generatedCaptcha}
          </div>
          <div
            className={isValid ? "captcha-output-success" : "captcha-output"}
          >
            {alertMessage}
          </div>
          <div>
            <button
              className={
                theme === "light" ? "captcha-btn-primary" : "captcha-btn-dark"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
