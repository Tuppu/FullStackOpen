import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial Message'
  
  const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      notificationReducer(state, action) {
        return initialState;
      }
    }
  })

export const { notificationReducer } = filterSlice.actions
export default filterSlice.reducer