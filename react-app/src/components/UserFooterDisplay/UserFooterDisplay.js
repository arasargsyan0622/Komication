import "./UserFooterDisplay.css";

import { useSelector } from "react-redux";

function UserFooterDisplay() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="user__footer__display">
      <div className="user__footer__contents">
        <div className="user__footer__information">
          {/* <div className="user__footer__avatar"></div> */}
          <img className="user__footer__avatar" src={user.avatar_url}></img>
          <div className="user__footer__details">
            <div>{user.username}</div>
            <span>#{user.id}</span>
          </div>
        </div>
        <div className="user__footer__settings"></div>
      </div>
    </div>
  );
}

export default UserFooterDisplay;
