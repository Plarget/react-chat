import type {FC} from "react"
import Tooltip from "@/shared/ui/Tooltip"
import IconButton from "@/shared/ui/IconButton"
import * as classNames from "classnames"
import SvgIcon from "@/shared/ui/SvgIcon"
import {TChatHeader} from "@/widgets/Chat/ui/ChatBody/ui/ChatHeader/types.ts"
import Button from "@/shared/ui/Button"
import {useState} from "react"
import Popup from "@/shared/ui/Popup"
import DeleteChat from "@/features/DeleteChat"
import ShowUsers from "@/features/ShowUsers"
import AddUsers from "@/features/AddUsers"
import "./ChatHeader.pcss"

const ChatHeader: FC<TChatHeader> = (props) => {
  const {
    chat,
    setActiveBar
  } = props
  const [isActivePopupDelete, setActivePopupDelete] = useState(false)
  const [isActivePopupUsers, setActivePopupUsers] = useState(false)
  const [isActivePopupAdd, setActivePopupAdd] = useState(false)

  const {title, id} = chat

  return (
    <header className="chat-body__header">
      <IconButton className="chat-body__header-back-button visible-mobile" onClick={() => setActiveBar(true)}>
        <SvgIcon className="chat-body__header-back-button-svg" name="arrow-back"/>
      </IconButton>
      <div className="chat-body__header-image-wrapper"></div>
      <h2 className="chat-body__header-title label label--small">{title}</h2>
      <Tooltip
        className="chat-body__header-tooltip"
        renderTriggerComponent={({className, ...props} = {}) => (
          <IconButton
            className={classNames(className, "chat-body__header-spread-button icon-button--hover")}
            {...props}
          >
            <SvgIcon className="chat-body__header-spread-button-svg" name="spread"/>
          </IconButton>
        )}
      >
        <Button
          className="chat-body__header-tooltip-button button--tooltip"
          onClick={() => setActivePopupUsers(true)}
        >
          <SvgIcon className="chat-body__header-spread-button-svg" name="persons"/>
          Список участников
        </Button>
        <Button
          className="chat-body__header-tooltip-button button--tooltip"
          onClick={() => setActivePopupAdd(true)}
        >
          <SvgIcon className="chat-body__header-spread-button-svg" name="add"/>
          Добавить пользователя
        </Button>
        <Button
          className="chat-body__header-tooltip-button button--tooltip button--tooltip-red"
          onClick={() => setActivePopupDelete(true)}
        >
          <SvgIcon className="chat-body__header-spread-button-svg" name="trash"/>
          Удалить чат
        </Button>
      </Tooltip>
      <Popup isActive={isActivePopupDelete} setActive={setActivePopupDelete}>
        <DeleteChat setActivePopup={setActivePopupDelete} id={id}/>
      </Popup>
      <Popup isActive={isActivePopupUsers} setActive={setActivePopupUsers}>
        <ShowUsers chatId={id}/>
      </Popup>
      <Popup isActive={isActivePopupAdd} setActive={setActivePopupAdd}>
        <AddUsers chatId={id}/>
      </Popup>
    </header>
  )
}

export default ChatHeader