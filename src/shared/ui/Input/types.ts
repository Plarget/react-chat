import { ForwardedRef, InputHTMLAttributes, MutableRefObject } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

export type TInput = InputHTMLAttributes<HTMLInputElement> & {
  classNameControl?: string,
  register?: UseFormRegisterReturn,
  label?: string,
  error?: string,
  ref?: ForwardedRef<HTMLInputElement>
  errorControl?: boolean
  inputRef?: MutableRefObject<any>
}