import rfdc from 'rfdc'
const clone = rfdc()

const GET_MESSAGES = '/api/direct_messages/GET_MESSAGES'
const ADD_MESSAGE = '/api/direct_messages/ADD_MESSAGE'
const EDIT_MESSAGE = '/api/direct_messages/EDIT_MESSAGE'
const REMOVE_MESSAGE = '/api/direct_messages/REMOVE_MESSAGE'

const getMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        messages,
    }
}

const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message,
    }
}

const editMessage = (message) => {
    return {
        type: EDIT_MESSAGE,
        message,
    }
}

const removeMessage = (message) => {
    return {
        type: REMOVE_MESSAGE,
        message,
    }
}

export const getMessagesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/direct_messages/`)
    if (response.ok) {
        const messages = await response.json()
        dispatch(getMessages(messages))
    }
    return response
}

export const addMessageThunk = (data) => async (dispatch) => {
    const { message } = data
    const response = await fetch(`/api/direct_messages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(addMessage(message))
    }
    return response
}

export const editMessageThunk = (data) => async (dispatch) => {
    const { message } = data
    const response = await fetch(`/api/direct_messages/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(editMessage(message))
    }
    return response
}

export const deleteMessageThunk = (data) => async (dispatch) => {
    const { message } = data
    const response = await fetch(`/api/direct_messages/${message.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(removeMessage(message))
    }
    return response
}

const initialState = {}

const directMessagesReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch (action.type) {
        case GET_MESSAGES:
            newState = action.messages
            return newState
        case ADD_MESSAGE:
            newState[action.message.id] = action.message
            return newState
        case EDIT_MESSAGE:
            newState[action.message.id] = action.message
            return newState
        case REMOVE_MESSAGE:
            delete newState[action.message.id]
            return newState
        default:
            return state
    }
}

export default directMessagesReducer
