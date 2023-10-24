import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users', 
  initialState: {},
  reducers: {
    LOG_IN(state, action) {
      state.current_user = action.payload
    },
    LOG_OUT(state, action) {
      state.current_user = null
    }
  }
})

export const { LOG_IN, LOG_OUT } = userSlice.actions

export default userSlice.reducer