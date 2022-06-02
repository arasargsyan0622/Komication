import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_CURR_CHANNEL = "api/channel/LOAD_CURR_CHANNEL"

const loadChannel = current_channel => {
    return {
        type: LOAD_CURR_CHANNEL,
        current_channel
    }
}

export const getCurrChannel = (data) => async dispatch => {
    const response = await fetch(`/api/channels/${data}`);
    if (response.ok){
        const channel = await response.json()
        dispatch(loadChannel(channel))
    }
}

const initialState = {}

const currChannelReducer = (state=initialState, action) => {
    const newState = clone(state);
    switch(action.type) {
        case LOAD_CURR_CHANNEL:
            const current_channel = action.current_channel
            console.log(current_channel)
            newState[current_channel.channel_name] = current_channel
            return newState
        default:
            return newState
    }
}

export default currChannelReducer
