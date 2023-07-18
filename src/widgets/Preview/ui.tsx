import { FC } from "react"
import Button from "@/shared/ui/Button"
import authServices from "@/shared/services/authServices.ts"
import useAppSelector from "@/shared/hooks/useAppSelector.ts"
import useAppDispatch from "@/shared/hooks/useAppDispatch.ts"
import { clearUser } from "@/shared/store/reducers/UserSlice.ts"
import "./Preview.pcss"

const Preview: FC = () => {
  const {user} = useAppSelector(state => state.UserReducer)
  const dispatch = useAppDispatch()

  const onClickGetUser = () => {
    console.log(user)
  }

  const onClickLogOut = () => {
    authServices.postLogOut()
      .then(() => {
        dispatch(clearUser())
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      {user?.id}
      {user?.first_name}
      {user?.second_name}
      {user?.phone}
      <Button onClick={onClickGetUser}>Получить юзера</Button>
      <Button onClick={onClickLogOut}>Выйти</Button>
    </div>
  )
}

export default Preview