import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../../store/session";
import { months, years } from "../../../Utils";
import "./AuthFormsCSS/SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [monthColor, setMonthColor] = useState("#72767D");
  const [dayColor, setDayColor] = useState("#72767D");
  const [yearColor, setYearColor] = useState("#72767D");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/me" />;
  }

  return (
    <div>
      <div className="sign__up__form">
        <h1 className="sign__up__header">Create an account</h1>
        <form onSubmit={onSignUp}>
          <div className="signup__form__validation__error">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <h4>EMAIL</h4>
          <div>
            <input className="sign__up__input" type="text" name="email" onChange={updateEmail} value={email}></input>
          </div>
          <h4>USERNAME</h4>
          <div>
            <input
              className="sign__up__input"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <h4>PASSWORD</h4>
          <div>
            <input
              className="sign__up__input"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <h4>DATE OF BIRTH</h4>
          <div className="date__of__birth">
            <select
              className="month__select"
              style={{ color: monthColor }}
              onFocus={() => setMonthColor("#dcddde")}
              onChange={() => setMonthColor("#dcddde")}
            >
              <option className="option__placeholder" value="" disabled selected hidden>
                Select
              </option>
              {months.map((month) => {
                return (
                  <option className="option__drop__down" key={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <select
              className="day__select"
              style={{ color: dayColor }}
              onFocus={() => setDayColor("#dcddde")}
              onChange={() => setDayColor("#dcddde")}
            >
              <option className="option__placeholder" value="" disabled selected hidden>
                Select
              </option>
              {Array.apply(null, Array(31)).map(function (x, i) {
                return (
                  <option className="option__drop__down" key={i}>
                    {(i += 1)}
                  </option>
                );
              })}
            </select>
            <select
              className="year__select"
              style={{ color: yearColor }}
              onFocus={() => setYearColor("#dcddde")}
              onChange={() => setYearColor("#dcddde")}
            >
              <option className="option__placeholder" value="" disabled selected hidden>
                Select
              </option>
              {years.map((year) => {
                return (
                  <option className="option__drop__down" key={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="sign__up__button" type="submit">
            Continue
          </button>
          <Link className="sign__up__form__login__link" to="/login">
            Already have an account?
          </Link>
          <div className="sign__up__tos__pp">
            By registering, you agree to Komication's{" "}
            <Link className="sign__up__tos" to="/">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="sign__up__pp" to="/">
              Privacy Policy
            </Link>
            .
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
