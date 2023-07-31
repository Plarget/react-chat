import { TLogInUser, TSignUp, TUser } from "@/shared/types/comon.ts"
import { AxiosResponse } from "axios"

export type TAuthServices = {
  postSignIn: (data: TLogInUser) => Promise<AxiosResponse>,
  postSignUp: (data: TSignUp) => Promise<AxiosResponse>,
  getUserInfo: () => Promise<AxiosResponse<TUser>>,
  postLogOut: () => Promise<AxiosResponse>,
}
