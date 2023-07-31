import type { FC, RefObject } from "react"
import ChatMessage from "./ui/ChatMessage"
import { useEffect, useRef } from "react"
import { TChatMessages } from "./types.ts"
import "./ChatMessages.pcss"

const ChatMessages: FC<TChatMessages> = (props) => {
  const {
    messages
  } = props
  const ref: RefObject<HTMLDivElement> = useRef(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="chat-messages" ref={ref}>
      {hasMessages && (
        <ul className="chat-messages__message-list">
          {messages.map((message) => (
            <li
              className="chat-messages__message-item"
              key={message.id}
            >
              <ChatMessage message={message}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ChatMessages