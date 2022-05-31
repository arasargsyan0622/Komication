import { NavLink } from "react-router-dom";
import "./UserHomeCard.css";

function UserHomeCard({ user }) {
  return (
    <NavLink className={"home__card__link"} to={`/me`}>
      <div className="user__home__logo"></div>
    </NavLink>
  );
}

export default UserHomeCard;
