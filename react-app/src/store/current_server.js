import rfdc from "rfdc";
const clone = rfdc();

const LOAD_CURR_SERVER = "api/server/LOAD_CURR_SERVER";
const ADD_CHANNEL = "api/channels/ADD_CHANNEL";
const EDIT_CHANNEL = "api/channels/EDIT_CHANNEL";
const REMOVE_CHANNEL = "api/channels/REMOVE_CHANNEL";

const loadServer = (myServer) => {
  return {
    type: LOAD_CURR_SERVER,
    myServer,
  };
};

const addChannel = (channel, myServer) => {
  return {
    type: ADD_CHANNEL,
    channel,
    myServer,
  };
};

const editChannel = (channel, myServer) => {
  return {
    type: EDIT_CHANNEL,
    channel,
    myServer,
  };
};

const removeChannel = (channel, myServer) => {
  return {
    type: REMOVE_CHANNEL,
    channel,
    myServer,
  };
};

export const getCurrServer = (data) => async (dispatch) => {
  const response = await fetch(`/api/servers/${data}`);
  if (response.ok) {
    const server = await response.json();
    dispatch(loadServer(server));
  }
  return response;
};

export const createChannel = (data) => async (dispatch) => {
  const { channel_name, myServer } = data;
  const server_id = myServer.id;
  const response = await fetch(`/api/channels/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channel_name, server_id }),
  });
  console.log("this is in the thunk", response);
  if (response.ok) {
    const channel = await response.json();
    dispatch(addChannel(channel, myServer));
  }
  return response;
};

export const updateChannel = (data) => async (dispatch) => {
  const { channel_name, uuid } = data;
  console.log("channel name in thunk", channel_name);
  console.log("uuid in thunk", uuid);
  const response = await fetch(`/api/channels/${uuid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channel_name }),
  });

  if (response.ok) {
    const channel = await response.json();
    console.log("channel in update thunk", channel);
    dispatch(editChannel(channel));
  }
};

export const deleteChannel = (uuid) => async (dispatch) => {
  // console.log(uuid)
  const response = await fetch(`/api/channels/${uuid}`, {
    method: "DELETE",
  });
  console.log(response);
  if (response.ok) {
    const channel = await response.json();
    console.log(channel);
    dispatch(removeChannel(channel));
  }
};

const initialState = {};

const currServerReducer = (state = initialState, action) => {
    const newState = clone(state)

    switch(action.type) {
        case LOAD_CURR_SERVER:
          const currentServer = action.myServer
          const newobj ={}
          currentServer.server.channels.forEach(channel =>{
            newobj[channel.id] = channel
          })
          newState[currentServer.server.id] = currentServer
          newState[currentServer.server.id].server.channels = newobj
          return newState
        case ADD_CHANNEL:
          newState[action.channel.server_id].server.channels[action.channel.id] = action.channel
          return newState
        case EDIT_CHANNEL:
          newState[action.channel.server_id].server.channels[action.channel.id] = action.channel
          return newState
        case REMOVE_CHANNEL:
          currentServer = action.myServer
          delete newState[action.channel.server_id].server.channels[action.channel.channel_id]
          return newState
        default:
          return newState
    }
}

export default currServerReducer;
