import { RefObject } from "react"

export type TUseClickOutside = (callback: () => void, ref: RefObject<HTMLElement>) => void

export type TUseBodyLock = (ref: RefObject<HTMLElement>) => (state: boolean) => void

export type TUseToggle = (defaultState: boolean) => {
  value: boolean,
  toggleState: () => void
  setValue: (state: boolean) => void,
}

export type TUseDebounce = <T>(value: T, delay?: number) => T