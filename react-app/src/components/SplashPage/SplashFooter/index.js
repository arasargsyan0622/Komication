import "./SplashFooter.css";
import { ExternalLink } from "react-external-link";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function SplashFooter() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  return (
    <div>
      <div className="splash__footer__container">
        <div className="splash__footer__container__links">
          <div className="splash__footer__left">
            <h4>IMAGINE A PLACE</h4>
            <a href="mailto: KomicationApp@gmail.com">Contact Us!</a>
            <div className="splash__footer__left__images">
              <div className="splash__footer__tweet"></div>
              <div className="splash__footer__insta"></div>
              <div className="splash__footer__book"></div>
              <div className="splash__footer__ytube"></div>
            </div>
          </div>
          <div className="splash__footer__right__container">
            <div className="splash__footer__names">
              <h5>Vernyoon Chao</h5>
              <div className="splash__footer__names__links">
                <ExternalLink href="https://www.linkedin.com/in/vernyoon-chao-783494123/">Portfolio</ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/vernyoon-chao-783494123/">LinkedIn</ExternalLink>
                <ExternalLink href="https://github.com/VernyoonChao98">Github</ExternalLink>
              </div>
            </div>
            <div className="splash__footer__names">
              <h5>Darren Kong</h5>
              <div className="splash__footer__names__links">
                <ExternalLink href="https://www.linkedin.com/in/darren-kong-06b47013b/">Portfolio</ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/darren-kong-06b47013b/">LinkedIn</ExternalLink>
                <ExternalLink href="https://github.com/dkong1321">Github</ExternalLink>
              </div>
            </div>
            <div className="splash__footer__names">
              <h5>Chris Threadgill</h5>
              <div className="splash__footer__names__links">
                <ExternalLink href="https://www.linkedin.com/in/chris-threadgill-b05090185/">Portfolio</ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/chris-threadgill-b05090185/">LinkedIn</ExternalLink>
                <ExternalLink href="https://github.com/ChrisThreadgill">Github</ExternalLink>
              </div>
            </div>
            <div className="splash__footer__names">
              <h5>Ara Sargsyan</h5>
              <div className="splash__footer__names__links">
                <ExternalLink href="https://www.linkedin.com/in/ara-sargsyan-9a8a07237/">Portfolio</ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/ara-sargsyan-9a8a07237/">LinkedIn</ExternalLink>
                <ExternalLink href="https://github.com/arasargsyan0622">Github</ExternalLink>
              </div>
            </div>
          </div>
        </div>
        <div className="splash__footer__break"></div>
        <div className="splash__footer__sign__up">
          <div className="splash__footer__logo"></div>
          <button>
            {user ? (
              <Link className="splash__footer__sign__up__link" to="/me">
                Open Komi
              </Link>
            ) : (
              <Link className="splash__footer__sign__up__link" to="/sign-up">
                Sign up
              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplashFooter;
