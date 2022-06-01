import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_CURR_CHANNEL = "api/channel/LOAD_CURR_CHANNEL"
const ADD_MESSAGE = "api/message/ADD_MESSAGE"

const loadChannel = (myChannel) => {
    return {
        type: LOAD_CURR_CHANNEL,
        myChannel
    }
}


const addMessage = (myMessage) => {
    return {
        type: ADD_MESSAGE,
        myMessage
    }
}

export const getCurrChannel = (data) => async dispatch => {
    const response = await fetch(`/api/channels/${data}`);
    if (response.ok){
        const channel = await response.json()
        dispatch(loadChannel(channel))
    }
}

export const createMessage = data => async dispatch => {
    const {content, user_id, channel_id} = data
    const response = await fetch(`/api/channel_messages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, user_id, channel_id })
    })
    if(response.ok) {
        const myMessage = await response.json()
        dispatch(addMessage(myMessage))
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
        case ADD_MESSAGE:
            const newMessage = action.myMessage
            // console.log(newMessage.channel_message.channel_id)
            console.log(newState)
            newState[newMessage.channel_id].channel.channel_messages[newMessage.id] = newMessage
            console.log(newState)
            console.log("hello")
            return newState
        default:
            return newState
    }
}

export default currChannelReducer
