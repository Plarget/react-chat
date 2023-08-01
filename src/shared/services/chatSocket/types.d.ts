import { TMessage } from "@/shared/types/comon.ts"

type TChatSocketCallbackMessage = (state: ((array: Array<TMessage>) => Array<TMessage>) | Array<TMessage>) => void
type TChatSocketAddMessage =  (data: Array<TMessage> | TMessage) => void
type TChatSocketSendMessage =  (message: string) => void
type TChatSocketSetSocket =  (state: TChatSocket) => void

type TChatSocket = {
  socket: WebSocket,
  userId: number,
  callbackSetMessage: TChatSocketCallbackMessage,
  addMessage: TChatSocketAddMessage,
  sendMessage: TChatSocketSendMessage,
  setSocket: TChatSocketSetSocket
}