import { TUser } from "@/shared/types/comon.ts"
import { AxiosResponse } from "axios"

type TSignInUserData = {
  login: string,
  password: string,
}

export type TSignUpData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  confirm_password: string,
  phone: string
}

export type TAuthServices = {
  postSignIn: (data: TSignInUserData) => Promise<AxiosResponse>,
  postSignUp: (data: TSignUpData) => Promise<AxiosResponse>,
  getUserInfo: () => Promise<TUser>,
  postLogOut: () => Promise<AxiosResponse>,
}
