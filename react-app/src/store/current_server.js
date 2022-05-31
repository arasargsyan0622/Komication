import rfdc from "rfdc";
const clone = rfdc();

const LOAD_CURR_SERVER = "api/server/LOAD_CURR_SERVER";

const loadServer = (current_server) => {
  return {
    type: LOAD_CURR_SERVER,
    current_server,
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

const initialState = {};

const currServerReducer = (state = initialState, action) => {
    const newState = {}
    switch(action.type) {
        case LOAD_CURR_SERVER:
            const current_server = action.current_server
            newState[current_server.server.id] = current_server
            return newState
        default:
            return newState
    }
}

export default currServerReducer;
