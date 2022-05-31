import { NavLink } from "react-router-dom";
import "./UserServerCard.css";

function UserServerCard({ server }) {
  console.log(server, "server card");
  return (
    <NavLink
      className={"server__card__link"}
      to={`/servers/${server.server_invite_url}`}
    >
      <div className="user__server__card">{server.server_name[0]}</div>
    </NavLink>
  );
}

export default UserServerCard;
