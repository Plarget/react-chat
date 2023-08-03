import type { FC, MouseEventHandler, PropsWithChildren } from "react"
import classNames from "classnames"
import type { TPopup } from "./types.ts"
import { useEffect } from "react"
import IconButton from "@/shared/ui/IconButton"
import SvgIcon from "@/shared/ui/SvgIcon"
import useBodyLock from "@/shared/hooks/useBodyLock.ts"
import "./Popup.pcss"

const Popup: FC<PropsWithChildren<TPopup>> = (props) => {
  const {
    setActive,
    children
  } = props
  const bodyLock = useBodyLock()
  const popupClick: MouseEventHandler = (event) => {
    if (event.currentTarget === event.target) setActive(false)
  }

  useEffect(() => {
    bodyLock(true)
    return () => {
      bodyLock(false)
    }
  }, [])

  return (
    <div className={classNames("popup")} onClick={popupClick}>
      <div className="popup__body">
        <IconButton
          className="popup__cross icon-button--hover"
          aria-label="close the popup"
          onClick={() => setActive(false)}
        >
          <span className="popup__cross-svg-wrapper" title="close">
            <SvgIcon className="popup__cross-svg" name="cross"/>
          </span>
        </IconButton>
        {children}
      </div>
    </div>
  )
}

export default Popup