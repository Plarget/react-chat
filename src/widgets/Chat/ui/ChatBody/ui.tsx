import type {FC} from "react"
import {TChatBody} from "@/widgets/Chat/ui/ChatBody/types.ts"
import ChatHeader from "@/widgets/Chat/ui/ChatBody/ui/ChatHeader"
import ChatMain from "@/widgets/Chat/ui/ChatBody/ui/ChatMain"
import ChatForm from "@/widgets/Chat/ui/ChatBody/ui/ChatForm"
import "./ChatBody.pcss"

const ChatBody: FC<TChatBody> = (props) => {
  const {
    chat,
    setActiveBar,
    messages,
    sendMessage,
  } = props

  if (!chat) {
    return <div className="chat-body__empty text text--gray">Выберите чат чтобы отправить сообщение</div>
  }

  return (
    <div className="chat-body">
      <ChatHeader
        chat={chat}
        setActiveBar={setActiveBar}
      />
      <ChatMain
        messages={messages}
      />
      <ChatForm
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default ChatBody