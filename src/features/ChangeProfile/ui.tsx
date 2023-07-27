import type { FC } from "react"
import Input from "@/shared/ui/Input"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { TChangeProfile } from "@/shared/types/comon.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/shared/ui/Button"
import { useMutation } from "@tanstack/react-query"
import Loading from "@/shared/ui/Loading"
import usersServices from "@/shared/services/usersServices"
import { useIMask } from "react-imask"
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
  email: yup.string().required("Незаполненное поле")
    .email("Некорректный E-mail"),
  phone: yup.string().required("Незаполненное поле")
    .transform((value: string) => value.split(" ").join(""))
    .length(14, "Неккоректный номер")
})

const ChangeProfile: FC = () => {
  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
  } = useForm<TChangeProfile>({
    resolver: yupResolver(schema),
  })

  const {ref, unmaskedValue} = useIMask({
    mask: "{+7} (000) 000 00 00"
  })

  const {
    isLoading: isLoading,
    isError,
    error,
    mutate: changeProfile
  } = useMutation({
    mutationKey: ["changeProfile"],
    mutationFn: (data: TChangeProfile) => {
      const phone = "8" + unmaskedValue.slice(2)
      return usersServices.changeProfile({...data, phone})
    },
    onSuccess: () => {
      console.log("Успешно!")
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
          placeholder="Иван"
          error={errors?.first_name?.message}
        />
        <Input
          className="change-profile__input"
          register={register("second_name")}
          id="second_name"
          label="Фамилия"
          placeholder="Иванов"
          error={errors?.second_name?.message}
        />
        <Input
          className="change-profile__input"
          register={register("display_name")}
          id="display_name"
          label="Имя в чате"
          placeholder="Ванька"
          error={errors?.display_name?.message}
        />
        <Input
          className="change-profile__input"
          register={register("login")}
          id="login"
          label="Логин"
          placeholder="ivanivanov"
          error={errors?.login?.message}
        />
        <Input
          className="change-profile__input"
          register={register("email")}
          id="email"
          label="Почта"
          placeholder="pochta@yandex.ru"
          type="email"
          error={errors?.email?.message}
        />
        <Input
          className="change-profile__input"
          register={register("phone")}
          id="phone"
          label="Телефон"
          placeholder="+7 (909) 967 30 30"
          inputRef={ref}
          type="tel"
          error={errors?.phone?.message}
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