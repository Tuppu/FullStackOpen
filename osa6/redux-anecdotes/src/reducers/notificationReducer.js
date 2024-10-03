import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
  
  const filterSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      notificationReducer(state) {
        return state;
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
      }
    }
  })

export const { notificationReducer, showNotification, hideNotification } = filterSlice.actions

export const setNotification = (message, showSeconds) => {
  return async dispatch => {
    dispatch(showNotification((`${message}`)))
    setTimeout(() => {
        dispatch(hideNotification())
    }, showSeconds * 1000)
  }
}

export default filterSlice.reducer