import { createSlice } from '@reduxjs/toolkit'

let initialState = null
const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
if (loggedUserJSON) {
  initialState = JSON.parse(loggedUserJSON)
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReducer(state, action) {
      return state
    },
    setUser(state, action) {
      switch (action.type) {
        case 'user/setUser':
          if (action.payload) {
            return action.payload
          } else {
            return initialState
          }
      }
    },
  },
})

export const { userReducer, setUser } = userSlice.actions

export const updateUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    if (!user) {
      initialState = null
    }
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
