import {TChat} from "@/shared/types/comon.ts"

export type TChatSideBar = {
  setChat: (state: TChat) => void,
  isActive: boolean,
  setActive: (state: boolean) => void,
}
