import {TChat} from "@/shared/types/comon.ts"

export type TChatHeader = {
  chat: TChat,
  setActiveBar: (state: boolean) => void,
}