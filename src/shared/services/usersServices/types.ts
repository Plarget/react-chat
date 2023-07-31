import {
  TChangePassword,
  TChangeUserProfileRequest,
  TSearchUser,
  TUser
} from "@/shared/types/comon.ts"
import { AxiosResponse } from "axios"

export type TUsersServices = {
  changeAvatar: (file: File | null) => Promise<AxiosResponse>,
  changeProfile: (data: TChangeUserProfileRequest) => Promise<AxiosResponse>,
  changePassword: (data: TChangePassword) => Promise<AxiosResponse>,
  searchUser: (data: TSearchUser) => Promise<AxiosResponse<Array<TUser>>>,
}
