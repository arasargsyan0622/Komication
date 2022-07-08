import rfdc from "rfdc";
const clone = rfdc();

const GET_MESSAGES = "api/direct_messages/GET_MESSAGES";
const ADD_MESSAGE = "/api/direct_messages/ADD_MESSAGE";
// const EDIT_MESSAGE = '/api/direct_messages/EDIT_MESSAGE'
// const REMOVE_MESSAGE = '/api/direct_messages/REMOVE_MESSAGE'

const getMessages = (inbox) => {
  return {
    type: GET_MESSAGES,
    inbox,
  };
};

const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

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

export const getInbox = (data) => async (dispatch) => {
//   console.log("data ion get inbox ---------", data);
  const response = await fetch(`/api/direct_messages/${data}`);
  if (response.ok) {
    const inbox = await response.json();
    // console.log("inbox from thunj ----------", inbox);
    dispatch(getMessages(inbox));
  }
  return response;
};

export const addMessageThunk = (data) => async (dispatch) => {
  // console.log("data in addMessageThunk -==-=-===-=", data)
  const { content, user_id, inbox_channel_id } = data;
  const response = await fetch(`/api/direct_messages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, user_id, inbox_channel_id }),
  });
  // console.log("response ins addMessageThunk --------", response)
  // if (response.ok) {
  //   const message = await response.json();
    // console.log("message: ---------", message)
    // dispatch(addMessage(message));
  // }
  return response;
};

export const editMessageThunk = (data) => async (dispatch) => {
    const { content, id } = data
    const response = await fetch(`/api/direct_messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    })
    // if (response.ok) {
    //     const message = await response.json()
    //     dispatch(editMessage(message))
    // }
    return response;
}

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

const initialState = {};
const dirMsgsReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case GET_MESSAGES:
      const newObj = {};
      action.inbox.inbox_messages.forEach((message) => {
        newObj[message.id] = message;
      });
      newState = newObj;
      return newState;
    case ADD_MESSAGE:
      newState[action.message.id] = action.message;
      return newState
    default:
      return state;
  }
};

export default dirMsgsReducer;
