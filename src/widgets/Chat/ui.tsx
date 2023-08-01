import type { FC } from "react"
import ChatSideBar from "./ui/ChatSideBar"
import { useEffect, useState } from "react"
import { TChat, TMessage } from "@/shared/types/comon.ts"
import authServices from "@/shared/services/authServices"
import chatsServices from "@/shared/services/chatServices"
import ChatHeader from "./ui/ChatHeader"
import ChatMessages from "./ui/ChatMessages"
import ChatForm from "./ui/ChatForm"
import ChatSocket from "@/shared/services/chatSocket"
import { TChatSocket } from "@/shared/services/chatSocket/types.ts"
import { TChatAvatar } from "./types.ts"
import "./Chat.pcss"

const Chat: FC = () => {
  const [messages, setMessages] = useState<Array<TMessage>>([])
  const [currentChat, setCurrentChat] = useState<TChat | null>(null)
  const [isActiveBar, setActiveBar] = useState(true)
  const [socket, setSocket] = useState<TChatSocket>()
  const [chatAvatar, setChatAvatar] = useState<TChatAvatar>({
    src: "",
    chatId: 0
  })

  useEffect(() => {
    let curSocket: TChatSocket

    if (currentChat) {
      Promise.all([authServices.getUserInfo(), chatsServices.getToken(currentChat?.id)])
        .then(([user, token]) => {
          const getSocket = () => new ChatSocket(user.id, currentChat.id, token.data.token, setMessages, setSocket)
          const onCloseSocket = (event: CloseEvent) => {
            if (!event.wasClean) {
              curSocket = getSocket()
              curSocket.socket.onclose = onCloseSocket
            }
          }
          curSocket = getSocket()
          curSocket.socket.onclose = onCloseSocket
        })
        .catch((error) => console.log(error))
      setChatAvatar({
        src: "",
        chatId: currentChat.id
      })
    }
    return () => {
      curSocket?.socket.close()
    }
  }, [currentChat])

  return (
    <div className="chat">
      <ChatSideBar
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        isActive={isActiveBar}
        setActive={setActiveBar}
        chatAvatar={chatAvatar}
      />
      {(currentChat && socket) ? (
        <div className="chat__body">
          <ChatHeader
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            setActiveBar={setActiveBar}
            chatAvatar={chatAvatar}
            setChatAvatar={setChatAvatar}
          />
          <ChatMessages messages={messages}/>
          <ChatForm sendMessage={socket.sendMessage}/>
        </div>) : (
        <div className="chat__empty text text--gray">Выберите чат чтобы отправить сообщение</div>
      )}
    </div>
  )
}

export default Chat