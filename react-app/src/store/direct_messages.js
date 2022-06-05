import rfdc from 'rfdc'
const clone = rfdc()

// const GET_ONE_INBOX = "/api/direct_messages/GET_ONE_INBOX"
const LOAD_CURR_INBOXES = '/api/direct_messages/LOAD_CURR_INBOX'
const ADD_INBOX = 'api/direct_messages/ADD_INBOX'

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

// const oneInbox = inbox => {
//     return {
//         type: GET_ONE_INBOX,
//         inbox
//     }
// }

// export const getOneInbox = data => async dispatch => {
//     console.log("getOneInboxThunk ------", data)
//     const response = await fetch(`api/inbox`)
// }


export const getCurrentUserInboxes = (data) => async (dispatch) => {
    const response = await fetch(`/api/inbox_channel/${data}`)
    if (response.ok) {
        const inboxes = await response.json()
        dispatch(getInboxes(inboxes))
    }
    return response
}

export const addCurrentUserInbox = (data) => async (dispatch) => {
    const {userId, newUser} = data
    console.log("======================================")
    console.log(data)
    console.log("======================================")

    const response = await fetch(`api/inbox_channel/${userId}`, {
        method: "POST",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newUser }),
    })
    console.log(response)
    const inboxChannel = await response.json()
    console.log(inboxChannel)
    if (inboxChannel.id) {
        dispatch(addInbox(inboxChannel))
        return inboxChannel
    }
    else {
        console.log(inboxChannel)
        return inboxChannel
    }
}

const initialState = {}

const directMessagesReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch (action.type) {
        case LOAD_CURR_INBOXES:
            const currentInboxes = action.inboxes
            const normInboxes = {}
            currentInboxes.inbox_channels.forEach(inbox => {
                normInboxes[inbox.id] = inbox
            });
            newState = currentInboxes
            newState.inbox_channels = normInboxes
            return newState
        case ADD_INBOX:
            // console.log(action.inbox)
            const newInbox = action.inbox
            // console.log(newState)
            newState.inbox_channels[newInbox.id] = newInbox
            return newState
        default:
            return state
    }
}

export default directMessagesReducer
