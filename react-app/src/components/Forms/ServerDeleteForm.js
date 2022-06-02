import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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
      joinedServers[0].server_invite_url ==
        Object.values(currentServer)[0].server.server_invite_url &&
      joinedServers.length === 1
    ) {
      history.push("/me");
      window.location.reload(false);
    } else {
      const firstJoinedServer = joinedServers[1]?.server_invite_url;
      history.push(`/servers/${firstJoinedServer}`);
      window.location.reload(false);
    }
  };

  return (
    <div>
      <form className="">
        <button className="" onClick={handleSubmit}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ConfirmDeleteServer;
