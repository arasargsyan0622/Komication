import "./ServerTitleCard.css";
import { useHistory, UserHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ServerTitleCard() {
  const history = useHistory();
  const currentServer = useSelector((state) => state.current_server);
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
