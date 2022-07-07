import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
import "./HeaderNav.css";

function HeaderNav() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  return (
    <div>
      <div className="banner__container">
        <div className="splash__page__image__left"></div>
        <div className="splash__page__image__middle"></div>
        <div className="splash__page__image__right"></div>
      </div>
      <div className="absolute__banner">
        <div className="banner__contents__container">
          <div className="banner__nav">
            <div className="banner__nav__logo"></div>
            <div className="banner__nav__links__container">
              <ExternalLink className="banner__nav__links" href="https://arasargsyan0622.github.io/">
                Ara Sargsyan
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="https://christhreadgill.com/">
                Chris Threadgill
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="https://dkong1321.github.io/dkong-portfolio-page/">
                Darren Kong
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="https://github.com/VernyoonChao98">
                Vernyoon Chao
              </ExternalLink>
            </div>
            <button className="banner__nav__login">
              {!user ? (
                <Link className="banner__nav__login" to="/login">
                  Login
                </Link>
              ) : (
                <Link className="banner__nav__login" to="/me">
                  Open Komi
                </Link>
              )}
            </button>
          </div>
          <div className="banner__heading">
            <h1>IMAGINE A PLACE...</h1>
            <div className="banner__heading__message">
              ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and
              a handful of friends can spend time together. A place that makes it easy to talk every day and hang out
              more often.
            </div>
            <div className="banner__buttons">
              <button className="banner__download__button">
                <ExternalLink className="banner__download__link" href="https://github.com/arasargsyan0622/Komication">
                  Download the Repo!
                </ExternalLink>
              </button>
              <button
                className="banner__open__button"
                onClick={() => {
                  history.push("/me");
                }}
              >
                Open Komication in your browser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
