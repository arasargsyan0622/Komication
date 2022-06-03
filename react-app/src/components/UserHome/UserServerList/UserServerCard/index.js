import { NavLink } from "react-router-dom";
import "./UserServerCard.css";

function UserServerCard({ server }) {
  const channels = server.channels;
  const serverIconUrl = server.server_icon_url;

  //   {serverIconUrl && serverIconUrl?<img src=`${serverIconUrl}`/>:

  //   <div className="user__server__card">{server.server_name[0]}</div>
  // }

  return (
    <div>
      {channels.length > 0 ? (
        <NavLink
          className={"server__card__link"}
          to={`/servers/${server.server_invite_url}/${channels[0]?.channel_uuid}`}
          src="serverIconUrl"
        >
          <img src={serverIconUrl} className="user__server__card" />
        </NavLink>
      ) : (
        <NavLink className={"server__card__link"} to={`/servers/${server.server_invite_url}`}>
          <img src={serverIconUrl} className="user__server__card" />
        </NavLink>
      )}
    </div>
  );
}

export default UserServerCard;
