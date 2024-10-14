import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    blogsReducer(state, action) {
      return state
    },
    setBlogs(state, action) {
      switch (action.type) {
        case 'blogs/setBlogs':
          if (action.payload) {
            return action.payload
          } else {
            return initialState
          }
      }
    },
  },
})

export const { blogsReducer, setBlogs } = blogsSlice.actions

export const updateBlogs = (blogs) => {
  return async (dispatch) => {
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer
