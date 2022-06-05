import rfdc from "rfdc";
const clone = rfdc();

const LOAD_ALL_USERS = "/api/direct_messages/LOAD_ALL_USERS";

const allUsers = (users) => {
  return {
    type: LOAD_ALL_USERS,
    users,
  };
};

export const getAllUsers = (data) => async (dispatch) => {
  const response = await fetch(`/api/users/`);
  if (response.ok) {
    const users = await response.json();
    dispatch(allUsers(users));
  }
  return response;
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case LOAD_ALL_USERS:
      const allUsers = action.users;
      // console.log(allUsers, "all users");
      const normUsers = {};
      allUsers.users.forEach((user) => {
        normUsers[user.id] = user;
      });
      newState = normUsers;

      return newState;

    default:
      return state;
  }
};

export default usersReducer;
