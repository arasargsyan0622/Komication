import rfdc from 'rfdc'
const clone = rfdc()

const LOAD_CURR_INBOX = '/api/direct_messages/LOAD_CURR_INBOX'

const getInbox = (inbox) => {
    return {
        type: LOAD_CURR_INBOX,
        inbox,
    }
}

export const getCurrentInbox = (data) => async (dispatch) => {
    // console.log("data -==-=-===-=", data)
    const response = await fetch(`/api/inbox_channel/${data}`)
    // console.log("response ----------------", response)
    if (response.ok) {
        const inbox = await response.json()
        // console.log("inbox in thunk =================", inbox)
        dispatch(getInbox(inbox))
    }
    return response
}

const initialState = {}

const directMessagesReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch (action.type) {
        case LOAD_CURR_INBOX:
            const currentInbox = action.inbox
            const normInboxes = {}
            currentInbox.inbox_channels.forEach(inbox => {
                normInboxes[inbox.id] = inbox
            });
            newState = currentInbox
            newState.inbox_channels = normInboxes
            return newState
        default:
            return state
    }
}

export default directMessagesReducer
