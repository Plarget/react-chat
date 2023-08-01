import { FC } from "react"
import type { TSignInUserData } from "@/shared/services/authServices/types"
import type { TErrorResponse } from "@/shared/types/comon.ts"
import type { AxiosResponse } from "axios"
import Input from "@/shared/ui/Input"
import { useForm } from "react-hook-form"
import Button from "@/shared/ui/Button"
import { NavLink } from "react-router-dom"
import authServices from "@/shared/services/authServices"
import { useNavigate } from "react-router"
import useAppDispatch from "@/shared/hooks/useAppDispatch"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Loading from "@/shared/ui/Loading"
import { useMutation } from "@tanstack/react-query"
import { setAuth } from "@/shared/store/reducers/AuthSlice.ts"
import "./LogIn.pcss"

const schema = yup
  .object({
    login: yup.string().required("Незаполненное поле"),
    password: yup.string().required("Незаполненное поле"),
  })

const LogIn: FC = () => {
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<TSignInUserData>({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    isLoading,
    isError,
    error,
    mutate: signIn
  } = useMutation<AxiosResponse, TErrorResponse, TSignInUserData>({
    mutationKey: ["signIn"],
    mutationFn: authServices.postSignIn,
    onSuccess: () => {
      dispatch(setAuth(true))
      navigate("/")
    },
  })

  return (
    <div className="login">
      <h2 className="login__title title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit((data) => signIn(data))}>
        <div className="login__inputs">
          <Input
            className="login__input"
            register={register("login")}
            id="login"
            label="Логин"
            placeholder="ivanivanov"
            error={errors?.login?.message}
          />
          <Input
            className="login__input"
            register={register("password")}
            id="password"
            label="Пароль"
            type="password"
            placeholder="••••••••••••"
            error={errors?.password?.message}
          />
        </div>
        <div className="login__actions">
          {isError && <div className="login__error error">{error?.response?.data.reason}</div>}
          <Button className="login__button" type="submit">Авторизоваться</Button>
          <NavLink className="login__link link" to="/register">Нет аккаунта?</NavLink>
        </div>
      </form>
      {isLoading && <Loading/>}
    </div>
  )
}

export default LogIn