import { TChat, TChatDelete, TChatUsers, TCreateChat, TUserChat } from "@/shared/types/comon.ts"
import { AxiosResponse } from "axios"

export type TChatsServices = {
  getChats: (query: string) => Promise<AxiosResponse<Array<TChat>>>,
  createChat: (data: TCreateChat) => Promise<AxiosResponse>,
  deleteChat: (data: TChatDelete) => Promise<AxiosResponse>,
  getUsers: (id: number) => Promise<AxiosResponse<Array<TUserChat>>>,
  addUsers: (data: TChatUsers) => Promise<AxiosResponse>,
  deleteUsers: (data: TChatUsers) => Promise<AxiosResponse>,
  getToken: (id: number) => Promise<AxiosResponse<{ token: string }>>,
  changeAvatar: (data: {
    chatId: number,
    avatar: File | null
  }) => Promise<AxiosResponse>,
}