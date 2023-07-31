import { TUser, TUserChat } from "@/shared/types/comon.ts"
import { ReactNode } from "react"

export type TPreviewUser = {
  user: TUserChat | TUser,
  className?: string,
  actionButton?: ReactNode,
  isUserSelf?: boolean,
}