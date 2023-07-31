import type { FC, FormEventHandler } from "react"
import Input from "@/shared/ui/Input"
import IconButton from "@/shared/ui/IconButton"
import SvgIcon from "@/shared/ui/SvgIcon"
import { useState } from "react"
import { TChatForm } from "./types.ts"
import "./ChatForm.pcss"

const ChatForm: FC<TChatForm> = (props) => {
  const {
    sendMessage
  } = props

  const [value, setValue] = useState("")
  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    sendMessage(value)
    setValue("")
  }

  return (
    <form className="chat__form" onSubmit={onSubmit}>
      <Input
        className="chat__form-input"
        classNameControl="chat__form-input-control input__control--gray"
        placeholder="Сообщение"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <IconButton className="chat__form-button icon-button--blue">
        <SvgIcon className="chat__form-button-svg" name="arrow-send"/>
      </IconButton>
    </form>
  )
}

export default ChatForm