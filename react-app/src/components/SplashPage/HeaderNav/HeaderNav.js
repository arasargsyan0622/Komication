import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import "./HeaderNav.css";

function HeaderNav({ user }) {
  useState();
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
              <ExternalLink className="banner__nav__links" href="https://www.linkedin.com/in/ara-sargsyan-9a8a07237/">
                Ara Sargsyan
              </ExternalLink>
              <ExternalLink
                className="banner__nav__links"
                href="https://www.linkedin.com/in/chris-threadgill-b05090185/"
              >
                Chris Threadgill
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="https://www.linkedin.com/in/darren-kong-06b47013b/">
                Darren Kong
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="https://www.linkedin.com/in/vernyoon-chao-783494123/">
                Vernyoon Chao
              </ExternalLink>
            </div>
            <button className="banner__nav__login">
              <Link className="banner__nav__login" to="/login">
                Login
              </Link>
            </button>
          </div>
          <div className="banner__heading">
            <h1>IMAGINE A PLACE...</h1>
            <div>
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
              <button className="banner__open__button">Open Komication in your browser</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
{
  /* <NavBar className="test"></NavBar> */
}
