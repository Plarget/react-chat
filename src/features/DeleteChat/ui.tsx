import type { FC } from "react"
import type { AxiosResponse } from "axios"
import type { TErrorResponse } from "@/shared/types/comon.ts"
import type { TChatDeleteData } from "@/shared/services/chatServices/types"
import type { TDeleteChat } from "./types.ts"
import Button from "@/shared/ui/Button"
import { useMutation } from "@tanstack/react-query"
import chatsServices from "@/shared/services/chatServices"
import Loading from "@/shared/ui/Loading"
import "./DeleteChat.pcss"

const DeleteChat: FC<TDeleteChat> = (props) => {
  const {
    id,
    setActivePopup,
    setCurrentChat,
    setActiveBar
  } = props

  const {
    isLoading,
    isError,
    error,
    mutate: deleteChat
  } = useMutation<AxiosResponse, TErrorResponse, TChatDeleteData>({
    mutationKey: ["deleteChat"],
    mutationFn: chatsServices.deleteChat,
    onSuccess: () => {
      setActivePopup(false)
      setActiveBar(true)
      setCurrentChat(null)
    }
  })

  return (
    <div className="delete-chat">
      <h3 className="delete-chat__title title title--small">Вы действительно хотите удалить этот чат?</h3>
      <div className="delete-chat__actions">
        <Button className="delete-chat__button" onClick={() => setActivePopup(false)}>Нет</Button>
        <Button
          className="delete-chat__button button--red"
          onClick={() => deleteChat({chatId: id})}
        >
          Да
        </Button>
      </div>
      {isError && <div className="delete-chat__error error">{error?.response?.data?.reason}</div>}
      {isLoading && <Loading/>}
    </div>
  )
}

export default DeleteChat