import type { FC, FormEventHandler } from "react"
import Button from "@/shared/ui/Button"
import usersServices from "@/shared/services/usersServices"
import { useState } from "react"
import * as classNames from "classnames"
import { useMutation } from "@tanstack/react-query"
import Loading from "@/shared/ui/Loading"
import "./ChangeAvatar.pcss"

const ChangeAvatar: FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const {
    isLoading,
    isError,
    error,
    mutate
  } = useMutation({
    mutationKey: ["changeAvatar"],
    mutationFn: usersServices.changeAvatar,
    onSuccess: () => {
      console.log("Успешно!")
    },
  })
  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    mutate(file)
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
        {file ? file?.name : "Выбрать файл на \nкомпьютере"}
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
        {isError &&
          <span className=" change-avatar__error error">{error?.response?.data?.reason || error?.message}</span>
        }
      </div>
      {isLoading && <Loading/>}
    </form>
  )
}

export default ChangeAvatar