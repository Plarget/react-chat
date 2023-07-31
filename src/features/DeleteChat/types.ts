import { TChat } from "@/shared/types/comon.ts"

export type TDeleteChat = {
  id: number,
  setActivePopup: (state: boolean) => void,
  setCurrentChat: (state: TChat | null) => void,
  setActiveBar: (state: boolean) => void,
}