import type { FC } from "react"
import Tooltip from "@/shared/ui/Tooltip"
import IconButton from "@/shared/ui/IconButton"
import * as classNames from "classnames"
import SvgIcon from "@/shared/ui/SvgIcon"
import { TChatHeader } from "./types.ts"
import Button from "@/shared/ui/Button"
import { useState } from "react"
import Popup from "@/shared/ui/Popup"
import DeleteChat from "@/features/DeleteChat"
import ShowUsers from "@/features/ShowUsers"
import AddUsers from "@/features/AddUsers"
import ChangeAvatar from "@/features/ChangeAvatar"
import "./ChatHeader.pcss"

const ChatHeader: FC<TChatHeader> = (props) => {
  const {
    currentChat,
    setCurrentChat,
    setActiveBar,
    chatAvatar,
    setChatAvatar
  } = props
  const [isActivePopupDelete, setActivePopupDelete] = useState(false)
  const [isActivePopupUsers, setActivePopupUsers] = useState(false)
  const [isActivePopupAdd, setActivePopupAdd] = useState(false)
  const [isActivePopupAvatar, setActivePopupAvatar] = useState(false)

  const {title, id, avatar} = currentChat

  return (
    <header className="chat__header">
      <IconButton
        className="chat__header-back-button visible-mobile"
        onClick={() => {
          setActiveBar(true)
          setCurrentChat(null)
        }}
      >
        <SvgIcon className="chat__header-back-button-svg" name="arrow-back"/>
      </IconButton>
      <button className="chat__header-image-wrapper" onClick={() => setActivePopupAvatar(true)}>
        {(avatar || chatAvatar.src) && (
          <img
            className="chat__header-image"
            src={chatAvatar.src ? chatAvatar.src : (
              avatar ? `https://ya-praktikum.tech/api/v2/resources/${avatar}` : ""
            )}
            alt="Chat avatar"
            width="34" height="34" loading="lazy"
          />
        )}
      </button>
      <h2 className="chat__header-title label label--small">{title}</h2>
      <Tooltip
        className="chat__header-tooltip"
        renderTriggerComponent={({className, ...props} = {}) => (
          <IconButton
            className={classNames(className, "chat__header-spread-button icon-button--hover")}
            {...props}
          >
            <SvgIcon className="chat__header-spread-button-svg" name="spread"/>
          </IconButton>
        )}
      >
        <Button
          className="chat__header-tooltip-button button--tooltip"
          onClick={() => setActivePopupUsers(true)}
        >
          <SvgIcon className="chat__header-spread-button-svg" name="persons"/>
          Список участников
        </Button>
        <Button
          className="chat__header-tooltip-button button--tooltip"
          onClick={() => setActivePopupAdd(true)}
        >
          <SvgIcon className="chat__header-spread-button-svg" name="add"/>
          Добавить пользователя
        </Button>
        <Button
          className="chat__header-tooltip-button button--tooltip button--tooltip-red"
          onClick={() => setActivePopupDelete(true)}
        >
          <SvgIcon className="chat__header-spread-button-svg" name="trash"/>
          Удалить чат
        </Button>
      </Tooltip>
      {isActivePopupDelete && (
        <Popup setActive={setActivePopupDelete}>
          <DeleteChat
            setActivePopup={setActivePopupDelete}
            id={id}
            setCurrentChat={setCurrentChat}
            setActiveBar={setActiveBar}
          />
        </Popup>
      )}
      {isActivePopupUsers && (
        <Popup setActive={setActivePopupUsers}>
          <ShowUsers chatId={id}/>
        </Popup>
      )}
      {isActivePopupAdd && (
        <Popup setActive={setActivePopupAdd}>
          <AddUsers chatId={id}/>
        </Popup>
      )}
      {isActivePopupAvatar && (
        <Popup setActive={setActivePopupAvatar}>
          <ChangeAvatar
            change="chat"
            chatId={id}
            setChatAvatar={setChatAvatar}
          />
        </Popup>
      )}
    </header>
  )
}

export default ChatHeader