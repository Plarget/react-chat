import type {FC} from "react"
import {Link} from "react-router-dom"
import Input from "@/shared/ui/Input"
import SvgIcon from "@/shared/ui/SvgIcon"
import {useQuery} from "@tanstack/react-query"
import chatsServices from "@/shared/services/chatServices"
import Popup from "@/shared/ui/Popup"
import {useState} from "react"
import CreateChat from "@/features/CreateChat"
import ChatPreview from "@/widgets/Chat/ui/ChatSideBar/ui/ChatPreview"
import {TChatSideBar} from "@/widgets/Chat/ui/ChatSideBar/types.ts"
import * as classNames from "classnames"
import "./ChatSideBar.pcss"

const ChatSideBar: FC<TChatSideBar> = (props) => {
  const {
    setChat,
    isActive,
    setActive
  } = props
  const [isActivePopup, setActivePopup] = useState(false)
  const [value, setValue] = useState("")

  const {data} = useQuery(
    ["getChats", value],
    () => chatsServices.getChats(value), {
      onSuccess: () => {
        console.log("Юху")
      },
      keepPreviousData: true
    }
  )

  const chats = data?.data

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
        <ul className="chat-side-bar__chat-list">
          {chats.map((el) => (
            <li className="chat-side-bar__chat-item" key={el.id}>
              <ChatPreview
                chat={el}
                setChat={setChat}
                setActive={setActive}
              />
            </li>
          ))}
        </ul>
        : (
          <div className="chat-side-bar__empty text text--gray">У вас нету доступных чатов</div>
        )
      }
      <Popup isActive={isActivePopup} setActive={setActivePopup}>
        <CreateChat/>
      </Popup>
    </aside>
  )
}

export default ChatSideBar