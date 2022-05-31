import "./ServerTitleCard.css";
import { useHistory, UserHistory } from "react-router-dom";

function ServerTitleCard({ currentServer }) {
  const history = useHistory();
  const serverName = Object.keys(currentServer)[0];

  return (
    <div className="server__title__card">
      <div
        className="server__title__card__contents"
        onClick={() => history.push("/servers/serverId/edit")}
      >
        <div
          className="server__title"
          onClick={(e) => {
            e.stopPropagation();
            history.push("/servers/serverId/edit");
          }}
        >
          {serverName}
        </div>
        <div
          className="server__edit"
          onClick={(e) => {
            e.stopPropagation();
            history.push("/servers/serverId/edit");
          }}
        ></div>
      </div>
    </div>
  );
}

export default ServerTitleCard;
