import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NonAuthFormsCSS/ConfirmDeleteServer.css";

import { deleteServer } from "../../store/server";

const ConfirmDeleteServer = ({ setShowConfirm }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentServer = useSelector((state) => state.current_server);
  const servers = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);

  const [inputServerName, setInputServerName] = useState("");
  const [errors, setErrors] = useState([]);

  const uuid = Object.values(currentServer)[0].server.server_invite_url;

  const serverName = Object.values(currentServer)[0].server.server_name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (inputServerName !== serverName) {
      setErrors(["Server name does not match (case sensitive)"]);
      return;
    }

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
    } else if (joinedServers[0].server_invite_url != Object.values(currentServer)[0].server.server_invite_url) {
      const firstJoinedServer = joinedServers[0]?.server_invite_url;
      if (joinedServers[0].channels[0]) {
        history.push(`/servers/${firstJoinedServer}/${joinedServers[0].channels[0].channel_uuid}`);
        window.location.reload(false);
      } else {
        history.push(`/servers/${firstJoinedServer}`);
        window.location.reload(false);
      }
    } else {
      const firstJoinedServer = joinedServers[1]?.server_invite_url;
      if (joinedServers[1].channels[0]) {
        history.push(`/servers/${firstJoinedServer}/${joinedServers[1].channels[0].channel_uuid}`);
        window.location.reload(false);
      } else {
        history.push(`/servers/${firstJoinedServer}`);
        window.location.reload(false);
      }
    }
  };

  return (
    <div>
      <div className="confirm__delete__server">
        <div className="server__delete__header">{`Delete '${serverName}'`}</div>
        <div className="confirm__server__name__input__container">
          <div className="confirm__delete__server__warning">{`Are you sure you want to delete ${serverName}?
          This action cannot be undone.`}</div>
          <label>ENTER SERVER NAME</label>
          <div className="server__delete__form__validation__error">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={serverName}
              value={inputServerName}
              onChange={(e) => setInputServerName(e.target.value)}
            ></input>
          </form>
        </div>
        <div className="confirm__delete__server__buttons">
          <div onClick={() => setShowConfirm(false)}>Cancel</div>
          <button className="" onClick={handleSubmit}>
            Delete Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteServer;
