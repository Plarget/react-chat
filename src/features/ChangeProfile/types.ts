import { TUser } from "@/shared/types/comon.ts"

export type TChangeProfile = {
  userRefetch: () => void,
  setActivePopup: (state: boolean) => void,
  user: TUser
}