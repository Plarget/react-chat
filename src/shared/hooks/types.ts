import { RefObject } from "react"

export type TUseClickOutside = (callback: () => void,ref: RefObject<HTMLElement>) => void

export type TUseBodyLock = (state: boolean,ref: RefObject<HTMLElement>) => () => void

export type TUseToggle = (defaultState: boolean) => {
  value: boolean,
  toggleState: () => void
  setValue: (state: boolean) => void,
}