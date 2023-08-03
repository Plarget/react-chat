import type { FC, FormEventHandler } from "react"
import type { AxiosResponse } from "axios"
import type { TErrorResponse } from "@/shared/types/comon.ts"
import type { TChangeUserAvatarData } from "@/shared/services/usersServices/types"
import type { TChangeChatAvatarData } from "@/shared/services/chatServices/types"
import type { TChangeAvatar } from "./types.ts"
import Button from "@/shared/ui/Button"
import usersServices from "@/shared/services/usersServices"
import { useState } from "react"
import classNames from "classnames"
import { useMutation } from "@tanstack/react-query"
import Loading from "@/shared/ui/Loading"
import chatsServices from "@/shared/services/chatServices"
import "./ChangeAvatar.pcss"

const ChangeAvatar: FC<TChangeAvatar> = (props) => {
  const {
    refetch,
    change,
    chatId,
    setChatAvatar
  } = props

  const [file, setFile] = useState<File | null>(null)
  const {
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
    error: errorProfile,
    mutate: changeAvatarProfile
  } = useMutation<AxiosResponse, TErrorResponse, TChangeUserAvatarData>({
    mutationKey: ["changeAvatarProfile"],
    mutationFn: usersServices.changeAvatar,
    onSuccess: () => {
      refetch?.()
    },
  })

  const {
    isLoading: isLoadingChat,
    isError: isErrorChat,
    error: errorChat,
    mutate: changeAvatarChat
  } = useMutation<AxiosResponse, TErrorResponse, TChangeChatAvatarData>({
    mutationKey: ["changeAvatarChat"],
    mutationFn: chatsServices.changeAvatar,
    onSuccess: () => {
      if (!file || !setChatAvatar) return null

      const reader = new FileReader()

      reader.onload = (event) => {
        setChatAvatar((object) => (
          {
            ...object,
            src: event.target?.result as string
          }
        ))
      }
      reader.readAsDataURL(file)
    }
  })
  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    if (change === "profile") {
      changeAvatarProfile(file)
    } else if (change === "chat" && chatId) {
      changeAvatarChat({
        chatId: chatId,
        avatar: file
      })
    }
  }

  return (
    <form className="change-avatar" onSubmit={onSubmit}>
      <h3 className="change-avatar__title title title--small">Загрузите файл</h3>
      <label
        className={classNames("change-avatar__label link link--underline", {
          "is-active": file?.name
        })}
        htmlFor="avatar"
      >
        {file ? file?.name : "Выбрать файл"}
      </label>
      <input
        className="change-avatar__input"
        name="avatar"
        type="file"
        id="avatar"
        onChange={(event) => {
          if (!event.target.files) return null
          setFile(event.target.files[0])
        }}
      />
      <div className="change-avatar__submit">
        <Button className="change-avatar__button" type="submit">Поменять</Button>
        {isErrorProfile &&
            <span
                className=" change-avatar__error error">{errorProfile?.response?.data?.reason || errorProfile?.message}</span>
        }
        {isErrorChat &&
            <span
                className=" change-avatar__error error">{errorChat?.response?.data?.reason || errorChat?.message}</span>
        }
      </div>
      {isLoadingProfile && <Loading/>}
      {isLoadingChat && <Loading/>}
    </form>
  )
}

export default ChangeAvatar