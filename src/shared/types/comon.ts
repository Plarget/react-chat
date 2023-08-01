import { AxiosError } from "axios"

export type TUser = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string
}


export type TErrorResponse = AxiosError<{
  reason: string
}>

export type TChat = {
  avatar: string | null,
  created_by: number,
  id: number,
  title: string,
  last_message: TMessage | null,
  unread_count: number,
}

export type TUserChat = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
  role: string
}

export type TMessage = {
  id: number,
  content: string,
  user_id: number,
  chat_id: number,
  type: string,
  time: Date,
  is_read: boolean,
  isUserReply: boolean,
  file: null,
}