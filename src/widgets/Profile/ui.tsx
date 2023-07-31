import type { FC } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import authServices from "@/shared/services/authServices"
import Button from "@/shared/ui/Button"
import { setAuth } from "@/shared/store/reducers/AuthSlice"
import useAppDispatch from "@/shared/hooks/useAppDispatch"
import { useState } from "react"
import Popup from "@/shared/ui/Popup"
import ChangeAvatar from "@/features/ChangeAvatar"
import ChangeProfile from "@/features/ChangeProfile"
import ChangePassword from "@/features/ChangePassword"
import SvgIcon from "@/shared/ui/SvgIcon"
import { Link } from "react-router-dom"
import Loading from "@/shared/ui/Loading"
import "./Profile.pcss"

const Profile: FC = () => {
  const [isActivePopupAvatar, setActivePopupAvatar] = useState(false)
  const [isActivePopupProfile, setActivePopupProfile] = useState(false)
  const [isActivePopupPassword, setActivePopupPassword] = useState(false)

  const dispatch = useAppDispatch()
  const {data: userData, refetch: userRefetch} = useQuery(
    ["userInfo"],
    authServices.getUserInfo,
  )
  const user = userData?.data

  const {mutate: logOut} = useMutation({
    mutationKey: ["logOut"],
    mutationFn: authServices.postLogOut,
    onSuccess: () => dispatch(setAuth(false))
  })

  if (!user) return <Loading/>

  return (
    <div className="profile">
      <Link className="profile__link" to="../" relative="path">
        <SvgIcon className="profile__link-svg" name="arrow-back" color="#ffde5a"/>
      </Link>
      <div className="profile__body container">
        <div className="profile__preview">
          <button className="profile__image-wrapper" onClick={() => setActivePopupAvatar(true)}>
            <img
              className="profile__image"
              src={user.avatar ? `https://ya-praktikum.tech/api/v2/resources/${
                user.avatar
              }` : "/images/content/avatar.png"}
              alt="empty avatar"
              width="40" height="40" loading="lazy"
            />
            <span className="profile__image-change text text--white">Поменять аватар</span>
          </button>
          <h2 className="profile__label label">{user.first_name}</h2>
        </div>
        <ul className="profile__info">
          <li className="profile__info-item">
            <h3 className="profile__info-title title title--tiny">Логин</h3>
            <div className="profile__info-detail label label--gray">{user.login}</div>
          </li>
          <li className="profile__info-item">
            <h3 className="profile__info-title title title--tiny">Имя</h3>
            <div className="profile__info-detail label label--gray">{user.first_name}</div>
          </li>
          <li className="profile__info-item">
            <h3 className="profile__info-title title title--tiny">Фамилия</h3>
            <div className="profile__info-detail label label--gray">{user.second_name}</div>
          </li>
          <li className="profile__info-item">
            <h3 className="profile__info-title title title--tiny">Имя в чате</h3>
            <div className="profile__info-detail label label--gray">{user.display_name || user.first_name}</div>
          </li>
        </ul>
        <div className="profile__actions">
          <Button className="profile__button" onClick={() => setActivePopupProfile(true)}>Изменить данные</Button>
          <Button className="profile__button" onClick={() => setActivePopupPassword(true)}>Изменить пароль</Button>
          <Button className="profile__button button--red" onClick={() => logOut()}>Выйти</Button>
        </div>
      </div>
      {isActivePopupAvatar && (
        <Popup setActive={setActivePopupAvatar}>
          <ChangeAvatar change="profile" refetch={userRefetch}/>
        </Popup>
      )}
      {isActivePopupProfile &&
        (<Popup setActive={setActivePopupProfile}>
            <ChangeProfile userRefetch={userRefetch} setActivePopup={setActivePopupProfile} user={user}/>
          </Popup>
        )}
      {isActivePopupPassword && (
        <Popup setActive={setActivePopupPassword}>
          <ChangePassword/>
        </Popup>
      )}
    </div>
  )
}

export default Profile