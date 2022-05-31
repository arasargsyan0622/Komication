import "./UserFooterDisplay.css";

function UserFooterDisplay() {
  return (
    <div className="user__footer__display">
      <div className="user__footer__contents">
        <div className="user__footer__information">
          <div className="user__footer__avatar"></div>
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
