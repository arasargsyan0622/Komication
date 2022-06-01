import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_CURR_CHANNEL = "api/channel/LOAD_CURR_CHANNEL"

const loadChannel = (myChannel) => {
    return {
        type: LOAD_CURR_CHANNEL,
        myChannel
    }
}

export const getCurrChannel = (data) => async dispatch => {
    const response = await fetch(`/api/channels/${data}`);
    console.log(response)
    if (response.ok){
        const channel = await response.json()
        dispatch(loadChannel(channel))
    }
}

const createMessage = data => async dispatch => {
    const {content} = data
    const response = await fetch(`/api/channel_messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    })
    if(response.ok) {
        const message = await response.json()
        dispatch()
    }
}


const initialState = {}

const currChannelReducer = (state=initialState, action) => {
    const newState = clone(state);
    switch(action.type) {
        case LOAD_CURR_CHANNEL:
            const currentChannel = action.myChannel
            console.log("==-=-=-=-=-===", currentChannel)
            console.log("==-=-=-=-=-===", newState)

            const normMessages = {}
            currentChannel.channel.channel_messages.forEach(message => {
                normMessages[message.id] = message
            })
            console.log("norMessages I need in state", normMessages)
            newState[currentChannel.channel.id] = currentChannel
            console.log("my new State ======", newState)
            console.log("key into new State ---======", newState[currentChannel.channel.id].channel.channel_messages)

            newState[currentChannel.channel.id].channel.channel_messages = normMessages
            console.log(newState)
            return newState
        default:
            return newState
    }
}

export default currChannelReducer
