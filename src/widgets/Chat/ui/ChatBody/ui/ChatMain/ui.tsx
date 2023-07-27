import type {FC, RefObject} from "react"
import ChatMessage from "@/widgets/Chat/ui/ChatBody/ui/ChatMain/ui/ChatMessage"
import * as classNames from "classnames"
import {useEffect, useRef} from "react"
import {TChatMain} from "@/widgets/Chat/ui/ChatBody/ui/ChatMain/types.ts"
import "./ChatMain.pcss"

const ChatMain: FC<TChatMain> = (props) => {
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
    <div className="chat-body__main" ref={ref}>
      {hasMessages && (
        <ul className="chat-body__main-list">
          {messages.map((message) => (
            <li
              className={classNames("chat-body__main-item", {
                "is-user-reply": message.isUserReply
              })}
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

export default ChatMain