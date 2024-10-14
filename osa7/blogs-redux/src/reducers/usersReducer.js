import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersReducer(state, action) {
      return state
    },
    setUsers(state, action) {
      switch (action.type) {
        case 'users/setUsers':
          if (action.payload) {
            return action.payload
          } else {
            return initialState
          }
      }
    },
  },
})

export const { usersReducer, setUsers } = usersSlice.actions

export const updateUsers = (users) => {
  return async (dispatch) => {
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
