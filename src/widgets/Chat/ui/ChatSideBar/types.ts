import { TChat } from "@/shared/types/comon.ts"
import { TChatAvatar } from "@/widgets/Chat/types.ts"

export type TChatSideBar = {
  currentChat: TChat | null,
  setCurrentChat: (state: TChat) => void,
  isActive: boolean,
  setActive: (state: boolean) => void,
  chatAvatar: TChatAvatar
}
