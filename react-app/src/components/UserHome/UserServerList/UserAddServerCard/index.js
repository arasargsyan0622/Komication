import { NavLink } from "react-router-dom";
import "./UserAddServerCard.css";

function UserAddServerCard({ user }) {
  return (
    <NavLink className={"user__add__server__link"} to={`/user/newServer`}>
      <div className="user__add__server__logo"></div>
    </NavLink>
  );
}

export default UserAddServerCard;
