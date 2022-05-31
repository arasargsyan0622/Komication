import { NavLink } from "react-router-dom";
import "./UserServerCard.css";

function UserServerCard({ server }) {
  return (
    <NavLink className={"server__card__link"} to={`/servers/${server?.url}`}>
      <div className="user__server__card">S</div>
    </NavLink>
  );
}

export default UserServerCard;
