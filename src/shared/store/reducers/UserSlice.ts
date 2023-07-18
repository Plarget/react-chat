import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TUserSlice } from "@/shared/store/reducers/types.ts"
import { fetchUser } from "@/shared/store/reducers/ActionCreators.ts"
import { TUser } from "@/shared/types/comon.ts"

const initialState: TUserSlice = {}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser() {
      return {}
    },
  },
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
    },
  }
})

export const { clearUser} = userSlice.actions
export default userSlice.reducer