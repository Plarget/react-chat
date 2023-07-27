import {TChat, TMessage} from "@/shared/types/comon.ts"

export type TChatBody = {
  chat: TChat | null,
  setActiveBar: (state: boolean) => void,
  messages: Array<TMessage>,
  sendMessage: (message: string) => void
}