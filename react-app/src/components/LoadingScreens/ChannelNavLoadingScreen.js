import "./LoadingScreens.CSS/ChannelNavLoadingScreen.css";

let random = Math.floor(Math.random() * 5);
setInterval(() => {
  random = Math.floor(Math.random() * 5);
}, 5000);
function ChannelNavLoadingScreen() {
  return (
    <div className="user__channel__nav__loading__container">
      <div>
        <div>
          <img
            className="channel__nav__loading__image"
            src="http://komication.s3.amazonaws.com/d2dc0f64255d4a168afa07ae7bea7c06.png"
          ></img>
        </div>
        <div>
          <div className="channel__nav__loading__header">HAVE YOU TRIED</div>
          <div className="channel__nav__loading__text">Inviting a friend to a server?!</div>
        </div>
      </div>
    </div>
  );
}

export default ChannelNavLoadingScreen;
