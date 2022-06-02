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
    await dispatch(login("demo@aa.io", "password"))

  }

  const demoLogin2 = async (e) => {
    e.preventDefault();
    await dispatch(login("zensan@p.hub", "DarrenStinks"))

  }

  const demoLogin3 = async (e) => {
    e.preventDefault();
    await dispatch(login("dripgod@p.hub", "password1"))

  }

  if (user) {
    return <Redirect to="/me" />;
  }

  return (
    <div className="login__form__container">
      <div className="login__form">
        <h1 className="login__header">Welcome Back!</h1>
        <div className="login__welcome__message">We're so excited to see you again!</div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <label className="login__label" htmlFor="email">
            EMAIL
          </label>
          <div>
            <input className="login__input" name="email" type="text" value={email} onChange={updateEmail} />
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
        <form onSubmit={demoLogin1}>
          <button type="submit" className="demo__login__button">Demo User:Demo</button>
        </form>
        <form onSubmit={demoLogin2}>
          <button type="submit" className="demo__login__button">Demo User:Zensan</button>
        </form>
        <form onSubmit={demoLogin3}>
          <button type="submit" className="demo__login__button">Demo User:Dripgod</button>
        </form>
      </div>

    </div>
  );
};

export default LoginForm;
