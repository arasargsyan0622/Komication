import { NavLink } from "react-router-dom";
import "./UserAddServerCard.css";

import NewServerModal from "../../../Modals/NewServerModal";

function UserAddServerCard({ user }) {
  return (
    // <NavLink className={"user__add__server__link"} to={`/user/newServer`}>
    //   <div className="user__add__server__logo"></div>
    // </NavLink>
    <NewServerModal />
  );
}

export default UserAddServerCard;
