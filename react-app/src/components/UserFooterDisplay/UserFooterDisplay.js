import "./UserFooterDisplay.css";

import { useSelector } from "react-redux";

function UserFooterDisplay() {
  const user = useSelector((state) => state.session.user);
  console.log(user, "hello from footer");

  return (
    <div className="user__footer__display">
      <div className="user__footer__contents">
        <div className="user__footer__information">
          {/* <div className="user__footer__avatar"></div> */}
          <img className="user__footer__avatar" src={user.avatar_url}></img>
          <div className="user__footer__details">
            <div>UserName</div>
            <span>#1337</span>
          </div>
        </div>
        <div className="user__footer__settings"></div>
      </div>
    </div>
  );
}

export default UserFooterDisplay;
