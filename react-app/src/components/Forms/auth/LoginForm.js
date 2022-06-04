import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../../store/session";
import "./AuthFormsCSS/LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin1 = async (e) => {
    e.preventDefault();
    await dispatch(login("komi@aa.io", "password"));
  };

  const demoLogin2 = async (e) => {
    e.preventDefault();
    await dispatch(login("brob@p.hub", "password1"));
  };

  const demoLogin3 = async (e) => {
    e.preventDefault();
    await dispatch(login("danny@aa.io", "password"));
  };

  if (user) {
    return <Redirect to="/me" />;
  }

  return (
    <div className="login__form__container">
      <div className="login__form">
        <h1 className="login__header">Welcome Back!</h1>
        <div className="login__welcome__message">
          We're so excited to see you again!
        </div>
        <form onSubmit={onLogin}>
          <div className="login__form__validation__error">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <label className="login__label" htmlFor="email">
            EMAIL
          </label>
          <div>
            <input
              className="login__input"
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <label className="login__label" htmlFor="password">
            PASSWORD
          </label>
          <div>
            <input
              className="login__password__input"
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="login__forgot__password__container">
            <Link className="login__form__links" to="/sign-up">
              Forgot your password?
            </Link>
          </div>
          <button className="login__button" type="submit">
            Login
          </button>
          <div className="login__register__link__container">
            Need an account?{" "}
            <Link className="login__form__links" to="/sign-up">
              Register
            </Link>
          </div>
        </form>
      </div>
      <div>
        <div className="demo__user__button__container">
          <img
            className="demo__user__icon"
            src="http://komication.s3.amazonaws.com/c85fcf48768a4fac810e7ac3ee1a3b85.png"
            alt="demo1-avatar"
          ></img>
          <form onSubmit={demoLogin1}>
            <button type="submit" className="demo__login__button">
              Login as Komi-san
            </button>
          </form>
        </div>
        <div className="demo__user__button__container">
          <img
            className="demo__user__icon"
            src="http://komication.s3.amazonaws.com/c5e357ac29014d4c864e555668100510.png"
            alt="demo2-avatar"
          ></img>
          <form onSubmit={demoLogin2}>
            <button type="submit" className="demo__login__button">
              Login as ATLShawty
            </button>
          </form>
        </div>
        <div className="demo__user__button__container">
          <img
            className="demo__user__icon"
            src="http://komication.s3.amazonaws.com/7947ca9db1384b29af36427eedef527b.png"
            alt="demo3-avatar"
          ></img>
          <form onSubmit={demoLogin3}>
            <button type="submit" className="demo__login__button">
              Login as PropanePrince
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
