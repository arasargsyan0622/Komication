import rfdc from "rfdc"
const clone = rfdc()

const ADD_CHANNEL = "api/channels/ADD_CHANNEL"

const addChannel = channel => {
    return {
        type: ADD_CHANNEL,
        channel
    }
}

export const createChannel = data => async dispatch => {
    const { channel_name, server_id } = data
    console.log("server id in thunk", server_id)
    const response = await fetch(`/api/channels/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel_name, server_id })
    })
    console.log("this is in the thunk", response)
    if(response.ok) {
        const channel = await response.json()
        dispatch(addChannel(channel))
    }
}

const initialState = {}

const channelReducer = (state = initialState, action) => {
    const newState = clone(state)
    switch(action.type) {
        case ADD_CHANNEL:
            newState[action.channel.id] = action.channel
            return newState
        default:
            return newState
    }
}


export default channelReducer
