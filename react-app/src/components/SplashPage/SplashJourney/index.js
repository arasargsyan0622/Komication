import "./SplashJourney.css";
import { ExternalLink } from "react-external-link";

function SplashJourney() {
  return (
    <div>
      <div className="splash__journey__container">
        <div className="splash__journey__heading">
          <h3>Ready to learn how to code?</h3>
          <button>
            <ExternalLink
              className="splash__journey__link"
              href="https://www.appacademy.io/course/software-engineer-online?utm_source=google&utm_medium=search&utm_term=app%20academy%20open&utm_campaign=core-brand-online&utm_content=rsa&utm_campaign=17317281734&utm_adgroup=133844678581&utm_matchtype=e&utm_device=c&utm_gclid=CjwKCAjws8yUBhA1EiwAi_tpEYUYqJHUZfcYzKKDwXmXmmclutUlc9J8M-XC_fF4H4XVjbzcSFFYhBoCU60QAvD_BwE&utm_creative=599256010014&utm_keyword=app%20academy%20open&utm_source=google&utm_medium=ppc&utm_adposition=&utm_placement=&utm_location=1013339&utm_network=g&gclid=CjwKCAjws8yUBhA1EiwAi_tpEYUYqJHUZfcYzKKDwXmXmmclutUlc9J8M-XC_fF4H4XVjbzcSFFYhBoCU60QAvD_BwE"
            >
              Apply at App Academy!
            </ExternalLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplashJourney;
