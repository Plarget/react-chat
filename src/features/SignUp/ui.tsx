import { FC } from "react"
import { useForm } from "react-hook-form"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import { NavLink } from "react-router-dom"
import { TErrorResponse, TSignUp } from "@/shared/types/comon.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import authServices from "@/shared/services/authServices"
import { useIMask } from "react-imask"
import useAppDispatch from "@/shared/hooks/useAppDispatch.ts"
import { useNavigate } from "react-router"
import Loading from "@/shared/ui/Loading"
import { useMutation } from "@tanstack/react-query"
import { setAuth } from "@/shared/store/reducers/AuthSlice.ts"
import "./SignUp.pcss"

const schema = yup
  .object({
    first_name: yup.string().required("Незаполненное поле").max(15, "Слишком длинный"),
    second_name: yup.string().required("Незаполненное поле")
      .max(15, "Слишком длинный"),
    login: yup.string().required("Незаполненное поле")
      .min(3, "Слишком короткий")
      .max(30, "Слишком длинный"),
    email: yup.string().required("Незаполненное поле")
      .email("Некорректный E-mail"),
    password: yup.string().required("Незаполненное поле")
      .min(5, "Слишком короткий").max(20, "Слишком длинный"),
    confirm_password: yup.string().required("Незаполненное поле")
      .oneOf([yup.ref("password")], "Пароли не совпадают"),
    phone: yup.string().required("Незаполненное поле")
      .transform((value: string) => value.split(" ").join(""))
      .length(14, "Неккоректный номер")
  })

const SignUp: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<TSignUp>({
    resolver: yupResolver(schema),
  })

  const {ref, unmaskedValue} = useIMask({
    mask: "{+7} (000) 000 00 00"
  })

  const {
    isLoading,
    isError,
    error,
    mutate: signUp
  } = useMutation<object, TErrorResponse, TSignUp>({
    mutationKey: ["signUp"],
    mutationFn: (data: TSignUp) => {
      const phoneValue = "8" + unmaskedValue.slice(2)
      return authServices.postSignUp({...data, phone: phoneValue})
    },
    onSuccess: () => {
      dispatch(setAuth(true))
      navigate("/")
    }
  })

  return (
    <div className="sign-in">
      <h2 className="sign-in__title title">Регистрация</h2>
      <form className="sign-in__form" onSubmit={handleSubmit((data) => signUp(data))} noValidate>
        <div className="sign-in__inputs">
          <Input
            className="sign-in__input"
            register={register("email")}
            id="email"
            type="email"
            error={errors.email?.message}
            label="Почта"
            placeholder="pochta@yandex.ru"
          />
          <Input
            className="sign-in__input"
            register={register("login")}
            id="login"
            error={errors.login?.message}
            label="Логин"
            placeholder="ivanivanov"
          />
          <Input
            className="sign-in__input"
            register={register("first_name")}
            id="first_name"
            error={errors.first_name?.message}
            label="Имя"
            placeholder="Иван"
          />
          <Input
            className="sign-in__input"
            register={register("second_name")}
            id="second_name"
            error={errors.second_name?.message}
            label="Фамилия"
            placeholder="Иванов"
          />
          <Input
            className="sign-in__input"
            register={register("phone")}
            id="phone"
            error={errors.phone?.message}
            inputRef={ref}
            type="tel"
            label="Телефон"
            placeholder="+7 (909) 967 30 30"
          />
          <Input
            className="sign-in__input"
            register={register("password")}
            id="password"
            error={errors.password?.message}
            label="Пароль"
            type="password"
            placeholder="••••••••••••"
            errorControl
          />
          <Input
            className="sign-in__input"
            register={register("confirm_password")}
            id="confirm_password"
            error={errors.confirm_password?.message}
            label="Пароль (ещё раз)"
            type="password"
            placeholder="••••••••••••"
            errorControl
          />
        </div>
        <div className="sign-in__actions">
          {isError && <div className="sign-in__error error">{error?.response.data.reason}</div>}
          <Button className="sign-in__button" type="submit">Зарегистрироваться</Button>
          <NavLink className="sign-in__link link" to="/login">Войти</NavLink>
        </div>
      </form>
      {isLoading && <Loading/>}
    </div>
  )
}

export default SignUp