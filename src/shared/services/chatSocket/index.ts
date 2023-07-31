import { TMessage } from "@/shared/types/comon.ts"
import { TChatSocket } from "./types.ts"

class ChatSocket implements TChatSocket {

  socket: WebSocket

  constructor(
    public userId: number,
    chatId: number,
    token: string,
    public callbackSetMessage: (state: ((array: Array<TMessage>) => Array<TMessage>) | Array<TMessage>) => void,
    public setSocket: (state: TChatSocket) => void,
  ) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
    this.userId = userId
    this.callbackSetMessage = callbackSetMessage
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        }))
    }

    this.socket.onclose = (event) => {
      console.log("Закрытие", event.wasClean)
      if (!event.wasClean) {
        this.socket = new ChatSocket(userId, chatId, token, callbackSetMessage, setSocket).socket
      }
    }

    this.socket.onmessage = (event: MessageEvent<string>) => {
      this.addMessage(JSON.parse(event.data) as Array<TMessage> | TMessage)
    }
    setSocket(this)
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