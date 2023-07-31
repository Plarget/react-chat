import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { TUseBodyLock } from "./types.ts"


const useBodyLock: TUseBodyLock = ( ref) => {
  return (state) => {
    if (!ref?.current) return null
    if (state) {
      disableBodyScroll(ref.current, {reserveScrollBarGap: true,})
    } else {
      enableBodyScroll(ref.current)
    }
  }
}

export default useBodyLock