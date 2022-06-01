import rfdc from "rfdc";
const clone = rfdc();

const LOAD_SERVERS = "api/severs/LOAD_SERVERS";
const ADD_SERVER = "api/servers/ADD_SERVER";
const UPDATE_SERVER = "api/servers/UPDATE_SERVER";
const DELETE_SERVER = "api/servers/DELETE_SERVER";

const loadServers = (servers) => {
  return {
    type: LOAD_SERVERS,
    servers,
  };
};

const addServer = (server) => {
  return {
    type: ADD_SERVER,
    server,
  };
};

const updateServer = (server) => {
  return {
    type: UPDATE_SERVER,
    server,
  };
};

const removeServer = (id) => {
  return {
    type: DELETE_SERVER,
    id,
  };
};

export const getServers = () => async (dispatch) => {
  console.log("getting servers from getServers");
  const response = await fetch("/api/servers/");
  if (response.ok) {
    const servers = await response.json();
    console.log(servers);
    dispatch(loadServers(servers));
  }
};

export const createServer = (data) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("server_name", data.serverName);
  formData.append("user_id", data.userId);
  const response = await fetch("/api/servers/", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const newServer = await response.json();
    console.log(newServer);
    dispatch(addServer(newServer));
    return newServer;
  }
};

export const editServer = (data) => async (dispatch) => {
  const formData = new FormData();
  formData.append("server_name", data.server_name);
  formData.append("image", data.image);
  formData.append("private", data.private);
  const response = await fetch(`/api/servers/${data.uuid}`, {
    method: "PUT",
    // headers: { "Content-Type": "application/json" },
    body: formData,
  });

  if (response.ok) {
    const editServer = await response.json();
    dispatch(updateServer(editServer));
    return editServer;
  }
};

export const deleteServer = (uuid) => async (dispatch) => {
  console.log("uuid in thunk", uuid);
  const response = await fetch(`/api/servers/${uuid}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const serverId = await response.json();
    dispatch(removeServer(serverId.server_id));
  }
};

const initialState = {};

const serverReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case LOAD_SERVERS:
      const servers = action.servers;
      servers.servers.forEach((server) => {
        newState[server.id] = server;
      });
      return newState;
    case ADD_SERVER:
      newState[action.server.id] = action.server;
      return newState;
    case UPDATE_SERVER:
      delete newState[action.server.id];
      newState[action.server.id] = action.server;
      return newState;
    case DELETE_SERVER:
      delete newState[action.id];
      return newState;
    default:
      return newState;
  }
};

export default serverReducer;
