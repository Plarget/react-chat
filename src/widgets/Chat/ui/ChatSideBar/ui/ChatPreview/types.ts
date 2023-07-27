import {TChat} from "@/shared/types/comon.ts"

export type TChatPreview = {
  chat: TChat,
  setChat: (state: TChat) => void,
  setActive: (state: boolean) => void,
}