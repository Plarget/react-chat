import {
  TUser
} from "@/shared/types/comon.ts"
import { AxiosResponse } from "axios"

type TSearchUserList = Array<TUser>

type TChangeUserAvatarData = File | null

type TChangePasswordData = {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}

type TChangeUserProfile = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
}

type TChangeUserProfileData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

type TSearchUserData = {
  login: string
}

type TUsersServices = {
  changeAvatar: (file: TChangeUserAvatarData) => Promise<AxiosResponse>,
  changeProfile: (data: TChangeUserProfileData) => Promise<AxiosResponse>,
  changePassword: (data: TChangePasswordData) => Promise<AxiosResponse>,
  searchUser: (data: TSearchUserData) => Promise<TSearchUserList>,
}
