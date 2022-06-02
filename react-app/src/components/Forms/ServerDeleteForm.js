import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NonAuthFormsCSS/ConfirmDeleteServer.css";

import { deleteServer } from "../../store/server";

const ConfirmDeleteServer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentServer = useSelector((state) => state.current_server);
  const servers = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);

  const uuid = Object.values(currentServer)[0].server.server_invite_url;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteServer(uuid));
    const valuesServer = Object.values(servers);
    // checks to see if im in any server
    const joinedServers = valuesServer.filter((server) => {
      const inServer = server.users.filter((checkingUser) => {
        if (checkingUser.id === user.id) {
          return user;
        }
      });

      // checks falsy value. inServer is an array and if its empty its falsy.
      if (inServer == false) {
        return;
      } else {
        return server;
      }
    });

    if (
      joinedServers[0].server_invite_url == Object.values(currentServer)[0].server.server_invite_url &&
      joinedServers.length === 1
    ) {
      history.push("/me");
      window.location.reload(false);
    } else if (
      joinedServers[0].server_invite_url !=
      Object.values(currentServer)[0].server.server_invite_url
    ) {
      const firstJoinedServer = joinedServers[0]?.server_invite_url;
      history.push(`/servers/${firstJoinedServer}`);
      window.location.reload(false);
    } else {
      const firstJoinedServer = joinedServers[1]?.server_invite_url;
      history.push(`/servers/${firstJoinedServer}`);
      window.location.reload(false);
    }
  };

  return (
    <div>
      <div className="confirm__delete__server">
        <div className="server__delete__header">{`Delete '${`server.name`}'`}</div>
        <div className="confirm__server__name__input__container">
          <div className="confirm__delete__server__warning">{`Are you sure you want to delete ${`server.name`}?
          This action cannot be undone.`}</div>
          <label>ENTER SERVER NAME</label>
          <form>
            <input type="text"></input>
          </form>
        </div>

        <div className="confirm__delete__server__buttons">
          <div>Cancel</div>
          <button className="" onClick={handleSubmit}>
            Delete Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteServer;
