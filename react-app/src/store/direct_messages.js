import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_CURR_INBOXES = '/api/direct_messages/LOAD_CURR_INBOX'
const ADD_INBOX = 'api/direct_messages/ADD_INBOX'
// const ADD_MESSAGE = '/api/direct_messages/ADD_MESSAGE'
// const EDIT_MESSAGE = '/api/direct_messages/EDIT_MESSAGE'
// const REMOVE_MESSAGE = '/api/direct_messages/REMOVE_MESSAGE'

const getInboxes = (inboxes) => {
    return {
        type: LOAD_CURR_INBOXES,
        inboxes,
    }
}

const addInbox = (inbox) => {
    return {
        type: ADD_INBOX,
        inbox
    }
}

// const addMessage = (message) => {
//     return {
//         type: ADD_MESSAGE,
//         message,
//     }
// }

// const editMessage = (message) => {
//     return {
//         type: EDIT_MESSAGE,
//         message,
//     }
// }

// const removeMessage = (message) => {
//     return {
//         type: REMOVE_MESSAGE,
//         message,
//     }
// }

export const getCurrentUserInboxes = (data) => async (dispatch) => {
    // console.log("data -==-=-===-=", data)
    const response = await fetch(`/api/inbox_channel/${data}`)
    // console.log("response ----------------", response)
    if (response.ok) {
        const inboxes = await response.json()
        // console.log("inbox in thunk =================", inbox)
        dispatch(getInboxes(inboxes))
    }
    return response
}

export const addCurrentUserInbox = (data) => async (dispatch) => {
    const {userId, newUser} = data
    const response = await fetch(`api/inbox_channel/${userId}`, {
        method: "POST",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newUser }),
    })
    console.log(response)
    if (response.ok) {
        const inboxChannel = await response.json()
        console.log(inboxChannel)
        console.log(inboxChannel.users)
        // inboxChannel.channel_inbox_user = inboxChannel.channel_inbox_user[0]
        dispatch(addInbox(inboxChannel))
    }
}
// export const addMessageThunk = (data) => async (dispatch) => {
//     const { message } = data
//     const response = await fetch(`/api/direct_messages/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//     })
//     if (response.ok) {
//         const message = await response.json()
//         dispatch(addMessage(message))
//     }
//     return response
// }

// export const editMessageThunk = (data) => async (dispatch) => {
//     const { message } = data
//     const response = await fetch(`/api/direct_messages/${message.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//     })
//     if (response.ok) {
//         const message = await response.json()
//         dispatch(editMessage(message))
//     }
//     return response
// }

// export const deleteMessageThunk = (data) => async (dispatch) => {
//     const { message } = data
//     const response = await fetch(`/api/direct_messages/${message.id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//     })
//     if (response.ok) {
//         const message = await response.json()
//         dispatch(removeMessage(message))
//     }
//     return response
// }

const initialState = {}

const directMessagesReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch (action.type) {
        case LOAD_CURR_INBOXES:
            const currentInboxes = action.inboxes
            const normInboxes = {}
            // console.log(action.inboxes)
            currentInboxes.inbox_channels.forEach(inbox => {
                normInboxes[inbox.id] = inbox
            });
            newState = currentInboxes
            newState.inbox_channels = normInboxes
            return newState
        case ADD_INBOX:
            console.log(action.inbox)
            const newInbox = action.inbox
            console.log(newState)
            newState.inbox_channels[newInbox.id] = newInbox
            return newState
        // case ADD_MESSAGE:
        //     newState[action.message.id] = action.message
        //     return newState
        // case EDIT_MESSAGE:
        //     newState[action.message.id] = action.message
        //     return newState
        // case REMOVE_MESSAGE:
        //     delete newState[action.message.id]
        //     return newState
        default:
            return state
    }
}

export default directMessagesReducer
