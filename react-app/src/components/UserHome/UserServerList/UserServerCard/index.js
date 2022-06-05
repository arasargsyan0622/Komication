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
        serverIconUrl != null ? (
          <div>
            <NavLink
              className={"server__card__link"}
              to={`/servers/${server.server_invite_url}/${channels[0]?.channel_uuid}`}
              src="serverIconUrl"
            >
              <img
                src={serverIconUrl}
                className="user__server__card"
                alt="serverIcon"
              />
              {/* <div className="server__card__name__tag">{server.server_name}</div> */}
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              className={"server__card__link"}
              to={`/servers/${server.server_invite_url}/${channels[0]?.channel_uuid}`}
              src="serverIconUrl"
            >
              <div className="user__server__card">{server.server_name[0]}</div>
              {/* <div className="server__card__name__tag">{server.server_name}</div> */}
            </NavLink>
          </div>
        )
      ) : serverIconUrl != null ? (
        <div>
          <NavLink
            className={"server__card__link"}
            to={`/servers/${server.server_invite_url}`}
          >
            <img
              src={serverIconUrl}
              className="user__server__card"
              alt="serverIcon"
            />
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink
            className={"server__card__link"}
            to={`/servers/${server.server_invite_url}`}
          >
            {/* <div className="server__card__name__tag">{server.server_name}</div> */}
            <div className="user__server__card">{server.server_name[0]}</div>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default UserServerCard;
