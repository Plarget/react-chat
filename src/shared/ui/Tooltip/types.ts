import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react"

export type TTooltip = PropsWithChildren<{
  className?: string,
  renderTriggerComponent: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}>
