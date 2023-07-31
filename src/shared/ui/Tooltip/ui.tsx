import type { FC } from "react"
import * as classNames from "classnames"
import { useRef } from "react"
import useClickOutside from "@/shared/hooks/useClickOutside.ts"
import useToggle from "@/shared/hooks/useToggle.ts"
import { TTooltip } from "./types.ts"
import "./Tooltip.pcss"

const Tooltip: FC<TTooltip> = (props) => {
  const {
    className,
    children,
    renderTriggerComponent
  } = props

  const {
    value: isActiveTooltip,
    toggleState: toggleActiveTooltip,
    setValue: setActiveTooltip
  } = useToggle(false)

  const ref = useRef(null)
  useClickOutside(() => setActiveTooltip(false), ref)

  return (
    <div className={classNames(className, "tooltip", {
      "is-active": isActiveTooltip
    })} ref={ref}>
      {renderTriggerComponent({
        className: "tooltip__button",
        onClick: toggleActiveTooltip
      })}
      <div className="tooltip__body">
        {isActiveTooltip && (children)}
      </div>
    </div>
  )
}

export default Tooltip