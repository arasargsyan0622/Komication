import rfdc from 'rfdc'
const clone = rfdc()

const ADD_MESSAGE = '/api/direct_messages/ADD_MESSAGE'
// const EDIT_MESSAGE = '/api/direct_messages/EDIT_MESSAGE'
// const REMOVE_MESSAGE = '/api/direct_messages/REMOVE_MESSAGE'


const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message,
    }
}

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


export const addMessageThunk = (data) => async (dispatch) => {
    // console.log("data in addMessageThunk -==-=-===-=", data)
    const { content, user_id, inbox_id } = data
    const response = await fetch(`/api/direct_messages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, user_id, inbox_id }),
    })
    // console.log("response ins addMessageThunk --------", response)
    if (response.ok) {
        const message = await response.json()
        dispatch(addMessage(message))
    }
    return response
}

// export const editMessageThunk = (data) => async (dispatch) => {
//     const { content, id } = data
//     const response = await fetch(`/api/direct_messages/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content }),
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
const dirMsgsReducer = (state = initialState, action) => {
    let newState = clone(state)
    switch(action.type) {
        case ADD_MESSAGE:
            console.log("is this even working?", action)
            const newMessage = action.message
            console.log("in reducer ------", newMessage)
            newState[newMessage.inbox_channel_id] = newMessage
            // console.log("newState for add message", newState)
            return newState
        // case EDIT_MESSAGE:
        //     const editMessage = action.message
        //     newState[editMessage.inbox_channel_id].inbox_messages[editMessage.id] = editMessage
        //     return newState
        default:
            return state
    }
}

export default dirMsgsReducer
