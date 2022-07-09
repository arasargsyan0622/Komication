// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CHANGE_USERNAME = "session/CHANGE_USERNAME"
const CHANGE_EMAIL = "session/CHANGE_EMAIL"
const CHANGE_PHONE_NUMBER = "session/CHANGE_PHONE_NUMBER"
const CHANGE_PASSWORD = "session/CHANGE_PASSWORD"

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const changeUsername = user => ({
  type: CHANGE_USERNAME,
  user
})

const changeEmail = user => ({
  type: CHANGE_EMAIL,
  user
})

const changePhoneNumber = user => ({
  type: CHANGE_PHONE_NUMBER,
  user
})

const changePassword = user => ({
  type: CHANGE_PASSWORD,
  user
})

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};


export const editUsername = (data) => async dispatch => {
  const formData = new FormData()
  formData.append("username", data.username)
  const response = await fetch(`/api/users/${data.id}/username`, {
    method: "PUT",
    body: formData,
  })

  if (response.ok) {
    const editUsername = await response.json()
    console.log("response is ok")
    dispatch(changeUsername(editUsername))
    return editUsername
  }
}

export const editEmail = (data) => async dispatch => {
  const formData = new FormData()
  formData.append("email", data.email)
  const response = await fetch(`/api/users/${data.id}/email`, {
    method: "PUT",
    body: formData,
  })

  if (response.ok) {
    const editEmail = await response.json()
    dispatch(changeEmail(editEmail))
    return editEmail
  }
}

export const editPhoneNumber = (data) => async dispatch => {
  const formData = new FormData()
  formData.append("phone_number", data.phone_number)
  const response = await fetch(`/api/users/${data.id}/phone-number`, {
    method: "PUT",
    body: formData,
  })

  if (response.ok) {
    const phoneNumber = await response.json()
    dispatch(changePhoneNumber(phoneNumber))
    return phoneNumber
  }
}

export const editPassword = (data) => async dispatch => {
  const formData = new FormData()
  formData.append("hashed_password", data.hashed_password)
  const response = await fetch(`/api/users/${data.userId}/hashed-password`, {
    method: "PUT",
    body: formData,
  })
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case CHANGE_USERNAME:
      state.user.username = action.user.username
      return state
    case CHANGE_EMAIL:
      state.user.email = action.user.email
      return state
    case CHANGE_PHONE_NUMBER:
      state.user.phone_number = action.user.phone_number
      return state
    default:
      return state;
  }
}
