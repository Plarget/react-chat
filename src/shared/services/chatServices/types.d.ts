import { TChat, TUserChat } from "@/shared/types/comon.ts"
import { AxiosResponse } from "axios"

type TGetChatUsers = Array<TUserChat>
type TChangeChatAvatarData = {
  chatId: number,
  avatar: File | null
}

type TCreateChatData = {
  title: string
}

type TChatUsers = {
  users: Array<number>,
  chatId: number
}

type TChatDeleteData = {
  chatId: number
}

type TGetChatList = Array<TChat>

type TChatsServices = {
  getChats: (query: string) => Promise<TGetChatList>,
  createChat: (data: TCreateChatData) => Promise<AxiosResponse>,
  deleteChat: (data: TChatDeleteData) => Promise<AxiosResponse>,
  getUsers: (id: number) => Promise<TGetChatUsers>,
  addUsers: (data: TChatUsers) => Promise<AxiosResponse>,
  deleteUsers: (data: TChatUsers) => Promise<AxiosResponse>,
  getToken: (id: number) => Promise<AxiosResponse<{ token: string }>>,
  changeAvatar: (data: TChangeChatAvatarData) => Promise<AxiosResponse>,
}