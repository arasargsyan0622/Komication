import "./LoadingScreens.CSS/UserHomeLoadingScreen.css";
const randomData = [
  "Darren is about to be available for hire!",
  "Vern really wants to be a TA at AppAcademy!",
  "Ara is heavy into debugging",
  "WEEK6!!!",
];
let random = Math.floor(Math.random() * 4);
setInterval(() => {
  random = Math.floor(Math.random() * 4);
}, 5000);
function UserHomeLoadingScreen() {
  return (
    <div className="user__home__loading__container">
      <div>
        <div>
          <div className="home__loading__image"></div>
        </div>
        <div>
          <div className="home__loading__header">DID YOU KNOW</div>
          <div className="home__loading__text">{randomData[random]}</div>
        </div>
      </div>
    </div>
  );
}

export default UserHomeLoadingScreen;
