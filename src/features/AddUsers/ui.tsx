import type { FC } from "react"
import Input from "@/shared/ui/Input"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import usersServices from "@/shared/services/usersServices"
import PreviewUser from "@/shared/ui/PreviewUser"
import IconButton from "@/shared/ui/IconButton"
import SvgIcon from "@/shared/ui/SvgIcon"
import * as classNames from "classnames"
import Button from "@/shared/ui/Button"
import chatsServices from "@/shared/services/chatServices"
import type { TAddUsers } from "./types.ts"
import useDebounce from "@/shared/hooks/useDebounce.ts"
import type { TSearchUserList } from "@/shared/services/usersServices/types"
import type { AxiosResponse } from "axios"
import type { TErrorResponse } from "@/shared/types/comon.ts"
import type { TChatUsers } from "@/shared/services/chatServices/types"
import "./AddUsers.pcss"

const AddUsers: FC<TAddUsers> = (props) => {
  const {
    chatId
  } = props

  const [value, setValue] = useState("")
  const [usersForm, setUsersForm] = useState<Array<number>>([])
  const debouncedValue = useDebounce<string>(value)
  const hasUsersInForm = usersForm.length > 0

  const {
    data: users,
    isError: isErrorsUsers,
    error: errorUsers
  } = useQuery<TSearchUserList, TErrorResponse>(
    ["searchUser", debouncedValue],
    () => usersServices.searchUser({login: debouncedValue.trim()}), {
      enabled: Boolean(debouncedValue.trim()),
      keepPreviousData: true,
    }
  )

  const {
    isError: isErrorAddUser,
    error: errorAddUser,
    mutate: addUsers
  } = useMutation<AxiosResponse, TErrorResponse, TChatUsers>({
    mutationKey: ["addUsers"],
    mutationFn: chatsServices.addUsers,
    onSuccess: () => {
      setValue("")
      setUsersForm([])
    }
  })

  return (
    <div className="add-user">
      <h3 className="add-user__title title title--small">Добавить пользователя</h3>
      <div className="add-user__search">
        <Input
          className="add-user__input"
          placeholder="ivanivanov"
          id="user-login"
          label="Логин"
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
        <ul className="add-user__user add-user__user-list">
          {(users && value) &&
            users.map((user) => (
              <li className="add-user__user-item" key={user.id}>
                <PreviewUser
                  className="add-user__user-preview"
                  user={user}
                  actionButton={
                    <IconButton
                      className={classNames("add-user__user-button", {
                        "is-active": usersForm.find((element) => element === user.id)
                      })}
                      onClick={() => (
                        usersForm.includes(user.id) ?
                          setUsersForm(array => (
                            array.filter((element) => element !== user.id)
                          )) :
                          setUsersForm([...usersForm, user.id])
                      )}
                    >
                      <SvgIcon className="add-user__user-button-svg" name="plus"/>
                    </IconButton>
                  }
                />
              </li>
            ))
          }
        </ul>
      </div>
      {hasUsersInForm && (
        <div className="add-user__actions">
          <Button
            className="add-user__button"
            onClick={() => addUsers({
              users: usersForm,
              chatId: chatId,
            })}
          >
            Добавить
          </Button>
          <Button
            className="add-user__button button--transparent button-transparent-red"
            onClick={() => setUsersForm([])}
          >
            Отмена
          </Button>
          {isErrorAddUser && (
            <div className="add-user__error error">{errorAddUser?.response?.data?.reason}</div>
          )}
        </div>)
      }
      {isErrorsUsers && (
        <div className="add-user__error error">{errorUsers?.response?.data?.reason}</div>
      )}
    </div>
  )
}

export default AddUsers