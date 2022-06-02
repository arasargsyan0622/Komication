import "./ServerTitleCard.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import ServerEditModal from "../../../Modals/ServerEditModal";

function ServerTitleCard() {
  const history = useHistory();
  const currentServer = useSelector((state) => state.current_server);
  const serverName = Object.values(currentServer)[0]?.server.server_name;

  // console.log(serverName);

  return (
    <div className="server__title__card">
      <ServerEditModal />
    </div>
  );
}

export default ServerTitleCard;
