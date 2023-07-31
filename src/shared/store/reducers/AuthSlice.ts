import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TAuthSlice } from "./types"

const initialState: TAuthSlice = {
  isAuth: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(_, action: PayloadAction<boolean>): TAuthSlice {
      return {
        isAuth: action.payload
      }
    }
  },
})

export const {setAuth} = authSlice.actions
export default authSlice.reducer