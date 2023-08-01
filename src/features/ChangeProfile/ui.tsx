import type { FC } from "react"
import type { TChangeUserProfile } from "@/shared/services/usersServices/types"
import type { AxiosResponse } from "axios"
import type { TErrorResponse } from "@/shared/types/comon.ts"
import Input from "@/shared/ui/Input"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/shared/ui/Button"
import { useMutation } from "@tanstack/react-query"
import Loading from "@/shared/ui/Loading"
import usersServices from "@/shared/services/usersServices"
import { useEffect } from "react"
import { TChangeProfile } from "@/features/ChangeProfile/types.ts"
import "./ChangeProfile.pcss"

const schema = yup.object({
  first_name: yup.string().required("Незаполненное поле")
    .max(15, "Слишком длинный"),
  second_name: yup.string().required("Незаполненное поле")
    .max(15, "Слишком длинный"),
  display_name: yup.string().required("Незаполненное поле"),
  login: yup.string().required("Незаполненное поле")
    .min(3, "Слишком короткий")
    .max(30, "Слишком длинный"),
})

const ChangeProfile: FC<TChangeProfile> = (props) => {
  const {
    userRefetch,
    setActivePopup,
    user
  } = props
  const {
    register,
    formState: {
      errors
    },
    reset,
    handleSubmit,
  } = useForm<TChangeUserProfile>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    reset({
      first_name: user.first_name,
      second_name: user.second_name,
      display_name: user.display_name,
      login: user.login
    })
  }, [])

  const {
    isLoading: isLoading,
    isError,
    error,
    mutate: changeProfile
  } = useMutation<AxiosResponse, TErrorResponse, TChangeUserProfile>({
    mutationKey: ["changeProfile"],
    mutationFn: (data: TChangeUserProfile) => {
      const dataChange = {
        ...data,
        phone: "89999999999",
        email: "example123@yandex.ru",
      }
      return usersServices.changeProfile(dataChange)
    },
    onSuccess: () => {
      userRefetch()
      setActivePopup(false)
    }
  })

  return (
    <form
      className="change-profile"
      onSubmit={handleSubmit((data) => changeProfile(data))}
    >
      <h3 className="change-profile__title title title--small">Настройки профиля</h3>
      <div className="change-profile__inputs">
        <Input
          className="change-profile__input"
          register={register("first_name")}
          id="first_name"
          label="Имя"
          placeholder="Ваше имя"
          error={errors?.first_name?.message}
        />
        <Input
          className="change-profile__input"
          register={register("second_name")}
          id="second_name"
          label="Фамилия"
          placeholder="Ваша фамилия"
          error={errors?.second_name?.message}
        />
        <Input
          className="change-profile__input"
          register={register("display_name")}
          id="display_name"
          label="Имя в чате"
          placeholder="Имя в чате"
          error={errors?.display_name?.message}
        />
        <Input
          className="change-profile__input"
          register={register("login")}
          id="login"
          label="Логин"
          placeholder="example123"
          error={errors?.login?.message}
        />
      </div>
      <div className="change-profile__submit">
        <Button className="change-profile__button" type="submit">Сохранить</Button>
        {isError && <span className="change-profile__error error">{error?.response?.data?.reason}</span>}
      </div>
      {isLoading && <Loading/>}
    </form>
  )
}

export default ChangeProfile