import "./SplashTopCard.css";
// import "./HeaderNav.css";

function SplashTopCard() {
  return (
    <div>
      <div className="splash__top__container">
        <div className="splash__top__picture"></div>
        <div className="splash__top__heading">
          <h2>Create an invite-only place where you belong</h2>
          <div>
            Komication servers are organized into topic-based channels where you can collaborate, share, and just talk
            about your day without clogging up a group chat.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashTopCard;
