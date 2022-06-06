import "./LoadingScreens.CSS/ChannelListLoadingScreen.css";

// let random = Math.floor(Math.random() * 5);
// setInterval(() => {
//   random = Math.floor(Math.random() * 5);
// }, 5000);
function ChannelListLoadingScreen() {
  return (
    <div className="user__channel__list__loading__container">
      <div>
        <div>
          <img
            alt="loading screen"
            className="channel__list__loading__image"
            src="http://komication.s3.amazonaws.com/d2dc0f64255d4a168afa07ae7bea7c06.png"
          ></img>
        </div>
        <div>
          <div className="channel__list__loading__header">MAKE SURE TO</div>
          <div className="channel__list__loading__text">Follow our dev team on GitHub and LinkedIn!!</div>
        </div>
      </div>
    </div>
  );
}

export default ChannelListLoadingScreen;
