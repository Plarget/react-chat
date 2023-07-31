import type { FC } from "react"
import { useForm } from "react-hook-form"
import { TChangePassword } from "@/shared/types/comon.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from "@/shared/ui/Input"
import { useMutation } from "@tanstack/react-query"
import usersServices from "@/shared/services/usersServices"
import Button from "@/shared/ui/Button"
import Loading from "@/shared/ui/Loading"
import "./ChangePassword.pcss"

const schema = yup.object({
  oldPassword: yup.string().required("Незаполненное поле"),
  newPassword: yup.string().required("Незаполненное поле")
    .min(5, "Слишком короткий").max(20, "Слишком длинный"),
  confirmNewPassword: yup.string().required("Незаполненное поле")
    .oneOf([yup.ref("newPassword")], "Пароли не совпадают"),
})

const ChangePassword: FC = () => {
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm<TChangePassword>({
    resolver: yupResolver(schema),
  })

  const {
    isLoading,
    isError,
    error,
    mutate: changePassword
  } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: usersServices.changePassword,
    onSuccess: () => {
      console.log("Успешно!")
      reset()
    }
  })

  return (
    <form
      className="change-password"
      onSubmit={handleSubmit((data) => changePassword(data))}
    >
      <h3 className="change-password__title title title--small">Смена пароля</h3>
      <div className="change-password__inputs">
        <Input
          className="change-password__input"
          register={register("oldPassword")}
          id="oldPassword"
          error={errors.oldPassword?.message}
          label="Старый пароль"
          type="password"
          placeholder="•••••••••"
        />
        <Input
          className="change-password__input"
          register={register("newPassword")}
          id="newPassword"
          error={errors.newPassword?.message}
          label="Новый пароль"
          type="password"
          placeholder="••••••••••••"
          errorControl
        />
        <Input
          className="change-password__input"
          register={register("confirmNewPassword")}
          id="confirmNewPassword"
          error={errors.confirmNewPassword?.message}
          label="Повторите новый пароль"
          type="password"
          placeholder="••••••••••••"
          errorControl
        />
      </div>
      <div className="change-password__submit">
        <Button className="change-password__button" type="submit">Отправить</Button>
        {isError && <span className="change-password__error error">{error?.response?.data?.reason}</span>}
      </div>
      {isLoading && <Loading/>}
    </form>
  )
}

export default ChangePassword