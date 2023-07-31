import { TChat } from "@/shared/types/comon.ts"
import { TChatAvatar } from "@/widgets/Chat/types.ts"

export type TChatHeader = {
  currentChat: TChat,
  setCurrentChat: (state: TChat | null) => void,
  setActiveBar: (state: boolean) => void,
  chatAvatar: TChatAvatar,
  setChatAvatar: (state: (state: TChatAvatar) => TChatAvatar) => void
}