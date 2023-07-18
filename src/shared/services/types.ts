import { TLogInUser, TSignUp, TUser } from "@/shared/types/comon.ts"

export type TAuthServices = {
  postSignIn: (data: TLogInUser) => Promise<object>,
  postSignUp: (data: TSignUp) => Promise<object>,
  getUserInfo: () => Promise<{ data: TUser }>,
  postLogOut: () => Promise<object>,
}