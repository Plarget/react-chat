import { createAsyncThunk } from "@reduxjs/toolkit"
import authServices from "@/shared/services/authServices.ts"

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async () => {
    return authServices.getUserInfo().then((response) => response.data)
  }
)