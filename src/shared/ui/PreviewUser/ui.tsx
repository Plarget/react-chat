import type { FC } from "react"
import { TPreviewUser } from "./types.ts"
import * as classNames from "classnames"
import "./PreviewUser.pcss"

const PreviewUser: FC<TPreviewUser> = (props) => {
  const {
    user,
    className,
    actionButton,
    isUserSelf
  } = props

  const {first_name, avatar, display_name} = user

  return (
    <div className={classNames(className, "preview-user")}>
      <div className="preview-user__info">
        {isUserSelf && <div className="preview-user__self label label--small">Вы:</div>}
        <div className="preview-user__image-wrapper">
          {avatar && (
            <img
              className="preview-user__image"
              src={`https://ya-praktikum.tech/api/v2/resources/${avatar}`}
              alt=""
              width="100" height="100" loading="lazy"
            />
          )}
        </div>
        <h4 className="preview-user__label label label--small">{display_name || first_name}</h4>
      </div>
      {actionButton}
    </div>
  )
}

export default PreviewUser