import { ReactNode } from "react"

export type TComponentFn = () => ReactNode
export type TWithProviders = (a: TComponentFn) => () => ReactNode