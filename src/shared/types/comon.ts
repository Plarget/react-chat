export type TLogInUser = {
  login: string,
  password: string,
}

export type TSignUp = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  confirm_password: string,
  phone: string
}

export type TUser = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string
}


export type TErrorResponse = {
  response: {
    data: {
      reason: string
    }
  }
  message: string
};

export type TChangeUserProfile= {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
}

export type TChangeUserProfileRequest = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export type TChangePassword = {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}

export type TCreateChat = {
  title: string
}

export type TChat = {
  avatar: string | null,
  created_by: number,
  id: number,
  title: string,
  last_message: TMessage | null,
  unread_count: number,
}

export type TChatDelete = {
  chatId: number
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

export type TSearchUser = {
  login: string
}

export type TChatUsers = {
  users: Array<number>,
  chatId: number
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