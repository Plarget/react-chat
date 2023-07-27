import type {FC} from "react"
import {TChatPreview} from "@/widgets/Chat/ui/ChatSideBar/ui/ChatPreview/types.ts"
import * as classNames from "classnames"
import getDateFormatted from "@/shared/utils/getDateFormatted"
import "./ChatPreview.pcss"

const ChatPreview: FC<TChatPreview> = (props) => {
  const {
    chat,
    setChat,
    setActive
  } = props

  const {title, last_message, unread_count} = chat

  return (
    <button
      className="chat-preview"
      type="button"
      onClick={() => {
        setActive(false)
        setChat(chat)
      }}
    >
      <div className="chat-preview__image-wrapper"></div>
      <div className="chat-preview__body">
        <div className="chat-preview__header">
          <h4 className="chat-preview__label label label--small">{title}</h4>
          <time className="chat-preview__time text text--gray text--small">
            {last_message && getDateFormatted(last_message.time)}
          </time>
        </div>
        <div className="chat-preview__footer">
          <div className="chat-preview__message text text--gray">
            {last_message ?
              last_message?.content :
              "Тут еще нету ни одного сообщения"}
          </div>
          <div className={classNames("chat-preview__unread-message", {
            "is-active": unread_count
          })}
          >
            {unread_count}
          </div>
        </div>
      </div>
    </button>
  )
}

export default ChatPreview