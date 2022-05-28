import React from "react";
import { ExternalLink } from "react-external-link";
import "./SplashPage.css";

function SplashPage() {
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
            <div className="banner__nav__logo">
              <img src="Komication/react-app/src/components/SplashPage/Kominicate_logo-1.svg"></img>
            </div>
            <div className="banner__nav__links__container">
              <ExternalLink className="banner__nav__links" href="https://www.google.com">
                Ara Sargsyan
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="www.google.com">
                Chris Threadgill
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="www.google.com">
                Darren Kong
              </ExternalLink>
              <ExternalLink className="banner__nav__links" href="www.google.com">
                Vernyoon Chao
              </ExternalLink>
            </div>
            <button className="banner__nav__login">Login</button>
          </div>
          <div className="banner__heading">
            <h1>IMAGINE A PLACE...</h1>
            <div>
              ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and
              a handful of friends can spend time together. A place that makes it easy to talk every day and hang out
              more often.
            </div>
            <div className="banner__buttons">
              <button className="banner__download__button"> Download the Repo!</button>
              <button className="banner__open__button">Open Komication in your browser</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
{
  /* <NavBar className="test"></NavBar> */
}
