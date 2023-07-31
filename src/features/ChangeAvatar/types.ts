import { TChatAvatar } from "@/widgets/Chat/types.ts"

export type TChangeAvatar = {
  change: "profile" | "chat",
  refetch?: () => void,
  chatId?: number,
  setChatAvatar?: (state: (state: TChatAvatar) => TChatAvatar) => void
}