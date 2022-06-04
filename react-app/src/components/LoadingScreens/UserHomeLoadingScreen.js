import "./LoadingScreens.CSS/UserHomeLoadingScreen.css";
const randomData = [
  "Darren is about to be available for hire!",
  "Vern and Chris both really want to be a TA's at AppAcademy!",
  "Ara is heavy into debugging",
  "WEEK6!!!",
  "Jan22 Cohort is hands down the best cohort!!",
];
let random = Math.floor(Math.random() * 5);
setInterval(() => {
  random = Math.floor(Math.random() * 5);
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
