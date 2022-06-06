import { useEffect } from "react";
import "./InboxSearchNav.css";

function InboxSearchNav({ currentChannel, please }) {
  // const [setIsLoaded] = useState(false);
  // console.log(currentChannel[0], "in the current channel component inbox search");
  // console.log(please[0]);

  useEffect(() => {}, [currentChannel]);
  return (
    <div className="inbox__nav__search__container">
      <div className="inbox__channel__username__container">
        <div className="inbox__username__at"></div>
        <div className="inbox__channel__username">{please[0]?.users.username}</div>
      </div>
      <div className="inbox__channel__search__container">
        <div className="inbox__channel__search__input__container">
          <input
            type="text"
            className="inbox__channel__search__input"
            placeholder="Coming Soon!"
            disabled={true}
          ></input>
          <div className="search__eye__glass"></div>
        </div>
        <div className="inbox__search__question__mark"></div>
      </div>
    </div>
  );
}

export default InboxSearchNav;
