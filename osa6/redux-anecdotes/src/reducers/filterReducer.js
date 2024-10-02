import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'SET_FILTER',
  payload: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterReducer(state, action) {
      switch (action.type) {
        case 'SET_FILTER':
          state.push(action.payload)
          break;
        default:
          state.push(state)
      }
    },
    filterChange(state, action) {
      switch (action.type) {
        case 'filter/filterChange':
          return {
            type: 'SET_FILTER',
            payload: action.payload,
          }
        default:
          return {
            type: 'SET_FILTER',
            payload: '',
          }
      }
    }
  }
})


 export const { filterReducer, filterChange } = filterSlice.actions
 export default filterSlice.reducer