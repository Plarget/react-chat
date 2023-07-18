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
  email: string,
  phone: string,
  avatar: string
}