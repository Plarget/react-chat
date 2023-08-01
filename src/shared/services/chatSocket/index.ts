import { TMessage } from "@/shared/types/comon.ts"
import { TChatSocket, TChatSocketCallbackMessage, TChatSocketSetSocket } from "./types"

class ChatSocket implements TChatSocket {

  socket: WebSocket

  constructor(
    public userId: number,
    chatId: number,
    token: string,
    public callbackSetMessage: TChatSocketCallbackMessage,
    public setSocket: TChatSocketSetSocket,
  ) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
    this.userId = userId
    this.callbackSetMessage = callbackSetMessage
    this.setSocket = setSocket

    this.init()
  }

  init = () => {
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        }))
    }

    this.socket.onmessage = (event: MessageEvent<string>) => {
      this.addMessage(JSON.parse(event.data) as Array<TMessage> | TMessage)
    }
    this.setSocket(this)
  }

  addMessage = (data: Array<TMessage> | TMessage) => {
    const isArray = Array.isArray(data)

    if (isArray) {
      const newMessages = data.map((item) => ({
        ...item,
        isUserReply: item.user_id === this.userId,
      }))
      this.callbackSetMessage(newMessages.reverse())
    } else {
      const newMessage = {
        ...data,
        isUserReply: data.user_id === this.userId,
      }
      this.callbackSetMessage((array) => [...array, newMessage] as Array<TMessage>)
    }
  }

  sendMessage = (message: string) => {
    this.socket.send(JSON.stringify({
      content: message,
      type: "message",
    }))
  }
}

export default ChatSocket