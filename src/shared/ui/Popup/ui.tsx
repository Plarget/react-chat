import type { FC, MouseEventHandler, PropsWithChildren } from "react"
import * as classNames from "classnames"
import { TPopup } from "@/shared/ui/Popup/types.ts"
import useBodyLock from "@/shared/hooks/useBodyLock.ts"
import { useEffect, useRef } from "react"
import IconButton from "@/shared/ui/IconButton"
import SvgIcon from "@/shared/ui/SvgIcon"
import "./Popup.pcss"

const Popup: FC<PropsWithChildren<TPopup>> = (props) => {
  const {
    isActive,
    setActive,
    children
  } = props
  const ref = useRef(null)
  const bodyLock = useBodyLock(isActive, ref)
  const popupClick: MouseEventHandler = (event) => {
    if (event.currentTarget === event.target) setActive(false)
  }

  useEffect(() => {
    bodyLock()
  }, [isActive])

  return (
    <div className={classNames("popup", {"is-active": isActive})} onClick={popupClick}>
      <div className="popup__body" ref={ref}>
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