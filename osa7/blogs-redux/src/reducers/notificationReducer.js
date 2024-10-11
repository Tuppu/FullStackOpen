import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationReducer(state) {
      return state
    },
    showNotification(state, action) {
      switch (action.type) {
        case 'notification/showNotification':
          return action.payload
      }
    },
    hideNotification(state, action) {
      switch (action.type) {
        case 'notification/hideNotification':
          return initialState
      }
    },
  },
})

export const { notificationReducer, showNotification, hideNotification } =
  notificationSlice.actions

export const setNotification = (
  message,
  messageType = 'error',
  showSeconds,
) => {
  return async (dispatch) => {
    dispatch(showNotification({ message, messageType }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, showSeconds * 1000)
  }
}

export default notificationSlice.reducer
