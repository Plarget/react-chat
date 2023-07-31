import type { FC, MouseEventHandler, PropsWithChildren } from "react"
import * as classNames from "classnames"
import { TPopup } from "./types.ts"
import useBodyLock from "@/shared/hooks/useBodyLock.ts"
import { useEffect, useRef } from "react"
import IconButton from "@/shared/ui/IconButton"
import SvgIcon from "@/shared/ui/SvgIcon"
import "./Popup.pcss"

const Popup: FC<PropsWithChildren<TPopup>> = (props) => {
  const {
    setActive,
    children
  } = props
  const ref = useRef(null)
  const bodyLock = useBodyLock(ref)

  const popupClick: MouseEventHandler = (event) => {
    if (event.currentTarget === event.target)     setActive(false)
  }

  useEffect( () => {
    bodyLock(true)
    return () => {
      console.log(ref)
    }
  }, [])

  return (
    <div className={classNames("popup")} onClick={popupClick}>
      <div className="popup__body" ref={ref}>
        <IconButton
          className="popup__cross icon-button--hover"
          aria-label="close the popup"
          onClick={() =>     setActive(false)}
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