import type {FC, RefObject} from "react"
import ChatSideBar from "@/widgets/Chat/ui/ChatSideBar"
import {useEffect, useRef, useState} from "react"
import ChatBody from "@/widgets/Chat/ui/ChatBody"
import {TChat, TMessage} from "@/shared/types/comon.ts"
import authServices from "@/shared/services/authServices"
import chatsServices from "@/shared/services/chatServices"
import "./Chat.pcss"

const Chat: FC = () => {
  const [messages, setMessages] = useState<Array<TMessage>>([])
  const [chat, setChat] = useState<TChat | null>(null)
  const [isActiveBar, setActiveBar] = useState(true)
  const webSocket: RefObject<WebSocket & {userId: number} | null> = useRef(null)

  const addMessage = (data: Array<TMessage> | TMessage) => {
    const isArray = Array.isArray(data)

    if (isArray) {
      const newMessages = data.map((item) => ({
        ...item,
        isUserReply: item.user_id === webSocket.userId,
      }))
      setMessages((array) => [...array, ...newMessages.reverse()])
    } else {
      const newMessage = {
        ...data,
        isUserReply: data.user_id === webSocket.userId,
      }
      setMessages((array) => [...array, newMessage])
    }
  }

  const sendMessage = (message: string) => {
    webSocket.current?.send(JSON.stringify({
      content: message,
      type: "message",
    }))
  }

  const initSocket = (userId: number, token: string) => {
    if (!chat) return null
    webSocket.userId = userId
    webSocket.current?.close()
    webSocket.current = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chat.id}/${token}`)
    webSocket.current.onopen = () => {
      webSocket.current?.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        }))
    }
    webSocket.current.onclose = () => {
      setMessages([])
    }
    webSocket.current.onmessage = (event: MessageEvent<string>) => {
      addMessage(JSON.parse(event.data))
    }
  }

  useEffect(() => {
    if (chat) {
      Promise.all([authServices.getUserInfo(), chatsServices.getToken(chat?.id)])
        .then(([user, token]) => {
          initSocket(user.data.id, token.data.token)
        })
    }
  }, [chat])

  return (
    <div className="chat">
      <ChatSideBar
        setChat={setChat}
        isActive={isActiveBar}
        setActive={setActiveBar}
      />
      <ChatBody
        chat={chat}
        setActiveBar={setActiveBar}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default Chat