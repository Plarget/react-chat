import type { FC } from "react"
import { Link } from "react-router-dom"
import Input from "@/shared/ui/Input"
import SvgIcon from "@/shared/ui/SvgIcon"
import { useQuery } from "@tanstack/react-query"
import chatsServices from "@/shared/services/chatServices"
import Popup from "@/shared/ui/Popup"
import { useState } from "react"
import CreateChat from "@/features/CreateChat"
import ChatPreview from "./ui/ChatPreview"
import { TChatSideBar } from "./types.ts"
import classNames from "classnames"
import useDebounce from "@/shared/hooks/useDebounce.ts"
import "./ChatSideBar.pcss"

const ChatSideBar: FC<TChatSideBar> = (props) => {
  const {
    currentChat,
    setCurrentChat,
    isActive,
    setActive,
    chatAvatar
  } = props
  const [isActivePopup, setActivePopup] = useState(false)
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce<string>(value)

  const {data: chats, refetch} = useQuery(
    ["getChats", debouncedValue, currentChat],
    () => chatsServices.getChats(debouncedValue), {
      keepPreviousData: true
    }
  )

  return (
    <aside className={classNames("chat-side-bar", {
      "is-active": isActive
    })}>
      <header className="chat-side-bar__header">
        <div className="chat-side-bar__actions">
          <button
            className="chat-side-bar__button text text--gray"
            type="button"
            onClick={() => setActivePopup(true)}
          >
            <SvgIcon className="chat-side-bar__button-svg" name="plus"/>
            Создать чат
          </button>
          <Link className="chat-side-bar__link text text--gray" to={"profile"}>
            Профиль
            <SvgIcon className="chat-side-bar__link-svg" name="arrow"/>
          </Link>
        </div>
        <div className="chat-side-bar__input-wrapper">
          <Input
            className="chat-side-bar__input"
            classNameControl="chat-side-bar__input-control input__control--gray"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          {!value && (
            <span className="chat-side-bar__input-placeholder text text--gray">
             <SvgIcon className="chat-side-bar__input-svg" name="search"/>
             Поиск
            </span>
          )}
        </div>
      </header>
      <div className="chat-side-bar__line-wrapper">
        <hr className="chat-side-bar__line"/>
      </div>
      {chats?.length ?
        <ul className="chat-side-bar__chat chat-side-bar__chat-list">
          {chats.map((el) => (
            <li className="chat-side-bar__chat-item" key={el.id}>
              <ChatPreview
                chat={el}
                setCurrentChat={setCurrentChat}
                setActive={setActive}
                chatAvatar={chatAvatar}
              />
            </li>
          ))}
        </ul>
        : (
          <div className="chat-side-bar__empty text text--gray">У вас нету доступных чатов</div>
        )
      }
      {isActivePopup && (
        <Popup setActive={setActivePopup}>
          <CreateChat setActivePopup={setActivePopup} refetch={refetch}/>
        </Popup>
      )}
    </aside>
  )
}

export default ChatSideBar