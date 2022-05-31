import { NavLink } from "react-router-dom";
import "./UserExploreCard.css";

function UserExploreCard() {
  return (
    <NavLink className={"user__explore__link"} to={`/`}>
      <div className="user__explore__logo"></div>
    </NavLink>
  );
}

export default UserExploreCard;
