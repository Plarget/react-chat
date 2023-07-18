import { FC } from "react"
import * as classNames from "classnames"
import { TInput } from "@/shared/ui/Input/types.ts"
import "./Input.pcss"


const Input: FC<TInput> = (props: TInput) => {
  const {
    className,
    id,
    register,
    label,
    error,
    errorControl,
    inputRef,
    ...rest
  } = props

  return (
    <div className={classNames(className, "input")}>
      {label && <label className="input__label" htmlFor={id}>{label}</label>}
      <input
        className={classNames("input__control",
          {"input__control--error": (errorControl && error)})}
        id={id}
        {...register}
        ref={(el) => {
          register?.ref(el)
          if (inputRef) {
            inputRef.current = el
          }
        }}
        {...rest}
      />
      {error && <span className="input__error">{error}</span>}
    </div>
  )
}

export default Input