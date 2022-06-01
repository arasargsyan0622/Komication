import rfdc from "rfdc";
const clone = rfdc();

const LOAD_CURR_SERVER = "api/server/LOAD_CURR_SERVER";
const ADD_CHANNEL = "api/channels/ADD_CHANNEL"

const loadServer = (current_server) => {
  return {
    type: LOAD_CURR_SERVER,
    current_server,
  };
};

const addChannel = (channel, myServer) => {
    return {
        type: ADD_CHANNEL,
        channel,
        myServer
    }
}

export const getCurrServer = (data) => async (dispatch) => {
  const response = await fetch(`/api/servers/${data}`);
  if (response.ok) {
    const server = await response.json();
    dispatch(loadServer(server));
  }
  return response;
};

export const createChannel = data => async dispatch => {
    const { channel_name, myServer } = data
    console.log(data)
    console.log(myServer)
    const server_id = myServer.id

    console.log("server id in thunk", server_id)
    const response = await fetch(`/api/channels/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel_name, server_id })
    })
    console.log("this is in the thunk", response)
    if(response.ok) {
        const channel = await response.json()
        dispatch(addChannel(channel, myServer))
    }
    return response
}

const initialState = {};

const currServerReducer = (state = initialState, action) => {
    const newState = clone(state)
    switch(action.type) {
        case LOAD_CURR_SERVER:
          // newState={}
          const current_server = action.current_server
          newState[current_server.server.id] = current_server
          return newState
        case ADD_CHANNEL:
          const new_channel = action.channel
          const new_channels = [...action.myServer.channels, new_channel]
          newState[action.myServer.id] = new_channels
          console.log("new state after adding channel \n",newState)
          return newState
        default:
          return newState
    }
}

export default currServerReducer;
