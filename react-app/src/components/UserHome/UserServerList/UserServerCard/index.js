import { NavLink } from "react-router-dom";
import "./UserServerCard.css";

function UserServerCard({ server }) {
  const channels = server.channels;

  

  return (
    <div>
      {channels.length > 0 ? (
        <NavLink
          className={"server__card__link"}
          to={`/servers/${server.server_invite_url}/${channels[0]?.channel_uuid}`}
        >
          <div className="user__server__card">{server.server_name[0]}</div>
        </NavLink>
      ) : (
        <NavLink
          className={"server__card__link"}
          to={`/servers/${server.server_invite_url}`}
        >
          <div className="user__server__card">{server.server_name[0]}</div>
        </NavLink>
      )}
    </div>
  );
}

export default UserServerCard;
