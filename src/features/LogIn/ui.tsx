import { FC, useState } from "react"
import Input from "@/shared/ui/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "@/shared/ui/Button"
import { NavLink } from "react-router-dom"
import { TLogInUser } from "@/shared/types/comon.ts"
import authServices from "@/shared/services/authServices.ts"
import { useNavigate } from "react-router"
import useAppDispatch from "@/shared/hooks/useAppDispatch.ts"
import { fetchUser } from "@/shared/store/reducers/ActionCreators.ts"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Loading from "@/shared/ui/Loading"
import "./LogIn.pcss"

const schema = yup
  .object({
    login: yup.string().required("Незаполненное поле")
      .min(3, "Слишком короткий").max(10, "Слишком длинный"),
    password: yup.string().required("Незаполненное поле")
      .min(5, "Слишком короткий").max(15, "Слишком длинный"),
  })
const LogIn: FC = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<TLogInUser>({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<TLogInUser> = (data) => {
    setIsLoading(true)
    authServices.postSignIn(data)
      .then(() => {
        dispatch(fetchUser()).then(() => navigate("/"))
      })
      .catch(error => setError(error.response.data.reason))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="login">
      <h2 className="login__title title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login__inputs">
          <Input
            className="login__input"
            register={register("login")}
            label="Логин"
            placeholder="ivanivanov"
            error={errors?.login?.message}
          />
          <Input
            className="login__input"
            register={register("password")}
            label="Пароль"
            type="password"
            placeholder="••••••••••••"
            error={errors?.password?.message}
          />
        </div>
        <div className="login__actions">
          {error && <div className="login__error error">{error}</div>}
          <Button className="login__button" type="submit">Авторизоваться</Button>
          <NavLink className="login__link link" to="/register">Нет аккаунта?</NavLink>
        </div>
      </form>
      {isLoading && <Loading/>}
    </div>
  )
}

export default LogIn