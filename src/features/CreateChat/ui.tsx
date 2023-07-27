import type {FC} from "react";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useMutation} from "@tanstack/react-query";
import {TCreateChat, TErrorResponse} from "@/shared/types/comon.ts";
import chatsServices from "@/shared/services/chatServices";
import Loading from "@/shared/ui/Loading";
import "./CreateChat.pcss"

const schema = yup.object({
  title: yup.string().required("Обязательное поле")
    .max(30, "Слишком большое название")
})

const CreateChat: FC = () => {
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm<TCreateChat>({
    resolver: yupResolver(schema),
  })

  const {
    isLoading,
    isError,
    error,
    mutate: createChat
  } = useMutation({
    mutationKey: ["createChat"],
    mutationFn: chatsServices.createChat,
    onSuccess: () => {
      console.log("Успешно!")
      reset()
    }
  })

  return (
    <form
      className="create-chat"
      onSubmit={handleSubmit((data) => createChat(data))}
    >
      <h3 className="create-chat__title title title--small">Создание чата</h3>
      <Input
        className="create-chat__input"
        register={register("title")}
        id="title"
        error={errors.title?.message}
        label="Название чата"
        placeholder="Кинолюбители"
      />
      <div className="create-chat__submit">
        <Button className="create-chat__button" type="submit">Создать</Button>
        {isError && <div className="create-chat__error error">{error?.response?.data?.reason}</div>}
      </div>
      {isLoading && <Loading/>}
    </form>
  )
}

export default CreateChat