import type {FC} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import chatsServices from "@/shared/services/chatServices"
import {TShowUsers} from "@/features/ShowUsers/types.ts"
import {TChatUsers, TErrorResponse} from "@/shared/types/comon.ts"
import PreviewUser from "@/shared/ui/PreviewUser"
import IconButton from "@/shared/ui/IconButton"
import SvgIcon from "@/shared/ui/SvgIcon"
import "./ShowUsers.pcss"

const ShowUsers: FC<TShowUsers> = (props) => {
  const {
    chatId
  } = props

  const {data, refetch} = useQuery(
    ["getUsers"],
    () => chatsServices.getUsers(chatId), {
      refetchOnMount: true
    }
  )

  const {
    mutate: deleteUsers
  } = useMutation<object, TErrorResponse, TChatUsers>({
    mutationKey: ["deleteUsers"],
    mutationFn: chatsServices.deleteUsers,
    onSuccess: () => {
      refetch()
    }
  })
  const users = data?.data

  return (
    <div className="show-users">
      <h3 className="show-users__title title title--small">Список пользователей</h3>
      <ul className="show-users__user show-users__user-list">
        {users?.length &&
          users.map((user) => (
            <li className="show-users__user-item" key={user.id}>
              <PreviewUser
                className="show-users__user-preview"
                user={user}
                actionButton={
                  <IconButton
                    className="show-users__user-button"
                    onClick={() => deleteUsers({
                      users: [user.id],
                      chatId: chatId
                    })}
                  >
                    <SvgIcon className="show-users__user-button-svg" name="plus"/>
                  </IconButton>
                }
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ShowUsers