import type {FC} from "react"
import {TChatMessage} from "@/widgets/Chat/ui/ChatBody/ui/ChatMain/ui/ChatMessage/types.ts"
import * as classNames from "classnames"
import getDateFormatted from "@/shared/utils/getDateFormatted"
import "./ChatMessage.pcss"

const ChatMessage: FC<TChatMessage> = (props) => {
  const {
    message
  } = props

  const {isUserReply, content, time} = message

  return (
    <div className={classNames("chat-message", {
      "is-user-reply": isUserReply
    })}>
      <div className="chat-message__text text">
        {content}
      </div>
      <div className="chat-message__time">{getDateFormatted(time)}</div>
    </div>
  )
}

export default ChatMessage