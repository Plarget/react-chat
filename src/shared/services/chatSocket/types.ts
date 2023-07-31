import { TMessage } from "@/shared/types/comon.ts"

export type TChatSocket = {
  socket: WebSocket,
  userId: number,
  callbackSetMessage: (state: (array: Array<TMessage>) => Array<TMessage>) => void,
  addMessage: (data: Array<TMessage> | TMessage) => void,
  sendMessage: (message: string) => void,
  setSocket: (state: TChatSocket) => void
}