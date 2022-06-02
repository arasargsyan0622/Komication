import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_CURR_CHANNEL = "api/channel/LOAD_CURR_CHANNEL"
const ADD_MESSAGE = "api/message/ADD_MESSAGE"
const EDIT_MESSAGE = "api/message/EDIT_MESSAGE"
const REMOVE_MESSAGE = 'api/message/REMOVE_MESSAGE'

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

const editMessage = (myMessage) => {
    return{
        type: EDIT_MESSAGE,
        myMessage
    }
}

const removeMessage = (myMessage) => {
    return {
        type: REMOVE_MESSAGE,
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

export const updateMessage = data => async dispatch => {
    const {content, id} = data
    console.log(id)
    const response = await fetch(`/api/channel_messages/${id}`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    })

    if(response.ok) {
        const myMessage = await response.json()
        dispatch(editMessage(myMessage))
    }
}

export const deleteMessage = data => async dispatch => {
    const response = await fetch(`/api/channel_messages/${data}`, {
        method:"DELETE",
    })
    if (response.ok) {
        const myMessage = await response.json();
        dispatch(removeMessage(myMessage))
    }
}

const initialState = {}

const currChannelReducer = (state=initialState, action) => {
    const newState = clone(state);
    switch(action.type) {
        case LOAD_CURR_CHANNEL:
            const currentChannel = action.myChannel
            const normMessages = {}
            currentChannel.channel.channel_messages.forEach(message => {
                normMessages[message.id] = message
            })
            newState[currentChannel.channel.id] = currentChannel
            newState[currentChannel.channel.id].channel.channel_messages = normMessages
            return newState
        case ADD_MESSAGE:
            const newMessage = action.myMessage
            newState[newMessage.channel_id].channel.channel_messages[newMessage.id] = newMessage
            return newState
        case EDIT_MESSAGE:
            const editMessage = action.myMessage
            newState[editMessage.channel_id].channel.channel_messages[editMessage.id] = editMessage
            return newState
        case REMOVE_MESSAGE:
            const currentMessage = action.myMessage
            delete newState[currentMessage.channel_id].channel.channel_messages[currentMessage.id]
            return newState
        default:
            return newState
    }
}

export default currChannelReducer
