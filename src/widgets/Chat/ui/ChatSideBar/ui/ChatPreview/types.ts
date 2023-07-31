import { TChat } from "@/shared/types/comon.ts"
import { TChatAvatar } from "@/widgets/Chat/types.ts"

export type TChatPreview = {
  chat: TChat,
  setCurrentChat: (state: TChat) => void,
  setActive: (state: boolean) => void,
  chatAvatar: TChatAvatar
}