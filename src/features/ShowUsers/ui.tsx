import type { FC } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import chatsServices from "@/shared/services/chatServices"
import { TShowUsers } from "./types.ts"
import PreviewUser from "@/shared/ui/PreviewUser"
import IconButton from "@/shared/ui/IconButton"
import SvgIcon from "@/shared/ui/SvgIcon"
import authServices from "@/shared/services/authServices"
import "./ShowUsers.pcss"

const ShowUsers: FC<TShowUsers> = (props) => {
  const {
    chatId
  } = props

  const {
    data: users,
    refetch: refetchChatUsers
  } = useQuery(
    ["getUsers"],
    () => chatsServices.getUsers(chatId)
  )

  const {data: dataUser} = useQuery(
    ["getUser"],
    authServices.getUserInfo
  )

  const {
    mutate: deleteUsers
  } = useMutation({
    mutationKey: ["deleteUsers"],
    mutationFn: chatsServices.deleteUsers,
    onSuccess: () => {
      refetchChatUsers()
        .catch((error) => console.log(error))
    }
  })

  return (
    <div className="show-users">
      <h3 className="show-users__title title title--small">Список пользователей</h3>
      <ul className="show-users__user show-users__user-list">
        {(users?.length && dataUser) &&
          users.map((user) => (
            <li className="show-users__user-item" key={user.id}>
              <PreviewUser
                className="show-users__user-preview"
                user={user}
                isUserSelf={user.id === dataUser.id}
                actionButton={user.id !== dataUser.id && (
                  <IconButton
                    className="show-users__user-button"
                    onClick={() => deleteUsers({
                      users: [user.id],
                      chatId: chatId
                    })}
                  >
                    <SvgIcon className="show-users__user-button-svg" name="plus"/>
                  </IconButton>
                )}
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ShowUsers