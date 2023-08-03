import type { FC } from "react"
import classNames from "classnames"
import { TButton } from "./types.ts"
import "./Button.pcss"

const Button: FC<TButton> = (props) => {
  const {
    className,
    children,
    type = "button",
    ...rest
  } = props

  return (
    <button
      className={classNames(className, "button")}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button